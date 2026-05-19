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

        if (store.dbConnected) {
            const newOrder = new Order({
                orderId, buyerName, buyerPhone, buyerAddress, buyerPincode,
                items, subtotal,
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
                items, subtotal, deliveryFee: deliveryFee ?? 30,
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
        if (store.dbConnected) {
            const orders = await Order.find().sort({ createdAt: -1 }).limit(100);
            return res.json(orders);
        } else {
            return res.json(store.orders);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
