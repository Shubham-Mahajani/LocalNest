const express = require('express');
const router  = express.Router();
const Order   = require('../models/Order');
const store   = require('../store');

// In-memory order fallback store
if (!store.orders) store.orders = [];

// ── POST /api/orders  — place a new order ──────────────────────────────────
router.post('/', async (req, res) => {
    try {
        const {
            buyerName, buyerPhone, buyerAddress, buyerPincode,
            items, subtotal, deliveryFee, grandTotal, paymentMethod
        } = req.body;

        // Validation
        if (!buyerName || !buyerPhone || !buyerAddress || !buyerPincode || !items?.length || !paymentMethod) {
            return res.status(400).json({ message: 'Missing required order fields.' });
        }

        // Generate order ID:  LN-XXXXXX
        const orderId = 'LN-' + Math.floor(100000 + Math.random() * 900000);

        const paymentStatus = paymentMethod === 'cod' ? 'pending' : 'paid';
        const normalizedItems = (items || []).map(item => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            qty: item.qty,
            sellerName: item.sellerName || '',
            sellerId: item.sellerId || '',
            image: item.image || ''
        }));

        if (store.dbConnected) {
            const newOrder = new Order({
                orderId, buyerName, buyerPhone, buyerAddress, buyerPincode,
                items: normalizedItems, subtotal,
                deliveryFee: deliveryFee ?? 30,
                grandTotal,
                paymentMethod,
                paymentStatus
            });
            const saved = await newOrder.save();
            return res.status(201).json({
                message: 'Order placed successfully',
                orderId: saved.orderId,
                _id: saved._id,
                paymentStatus: saved.paymentStatus
            });
        } else {
            // Memory fallback
            const order = {
                _id: 'mem-' + Date.now(), orderId,
                buyerName, buyerPhone, buyerAddress, buyerPincode,
                items: normalizedItems, subtotal, deliveryFee: deliveryFee ?? 30,
                grandTotal, paymentMethod, paymentStatus,
                status: 'placed', createdAt: new Date()
            };
            store.orders.unshift(order);
            return res.status(201).json({
                message: 'Order placed (memory fallback)',
                orderId, _id: order._id, paymentStatus
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ── GET /api/orders/:orderId  — look up by LN-XXXXXX ──────────────────────
router.get('/:orderId', async (req, res) => {
    try {
        if (store.dbConnected) {
            const order = await Order.findOne({ orderId: req.params.orderId });
            if (!order) return res.status(404).json({ message: 'Order not found' });
            return res.json(order);
        } else {
            const order = store.orders.find(o => o.orderId === req.params.orderId);
            if (!order) return res.status(404).json({ message: 'Order not found' });
            return res.json(order);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ── GET /api/orders  — list all orders (admin / debug) ────────────────────
router.get('/', async (req, res) => {
    try {
        const { sellerId, sellerName } = req.query;
        const matchesSeller = (order) => {
            if (!sellerId && !sellerName) return true;
            return (order.items || []).some(item =>
                (sellerId && item.sellerId === sellerId) ||
                (sellerName && item.sellerName === sellerName)
            );
        };

        if (store.dbConnected) {
            const orders = await Order.find().sort({ createdAt: -1 }).limit(100);
            return res.json(orders.filter(matchesSeller));
        } else {
            return res.json(store.orders.filter(matchesSeller));
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch('/:orderId/status', async (req, res) => {
    try {
        const { status } = req.body;
        const allowed = ['placed', 'processing', 'dispatched', 'delivered', 'cancelled'];
        if (!allowed.includes(status)) {
            return res.status(400).json({ message: 'Invalid order status.' });
        }

        if (store.dbConnected) {
            const updated = await Order.findOneAndUpdate(
                { orderId: req.params.orderId },
                { status },
                { new: true }
            );
            if (!updated) return res.status(404).json({ message: 'Order not found' });
            return res.json({ orderId: updated.orderId, status: updated.status });
        }

        const order = store.orders.find(o => o.orderId === req.params.orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        order.status = status;
        return res.json({ orderId: order.orderId, status: order.status });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
