const express = require('express');
const router  = express.Router();
const Product = require('../models/Product');
const store   = require('../store');

// GET all products — filter by location, category, or sellerId
router.get('/', async (req, res) => {
    try {
        const { location, category, sellerId } = req.query;
        let query = {};
        if (location) query.location = location;
        if (category) query.category = category;
        if (sellerId) query.sellerId = sellerId;

        if (store.dbConnected) {
            const products = await Product.find(query).sort({ createdAt: -1 });
            res.json(products);
        } else {
            let filtered = store.products;
            if (location) filtered = filtered.filter(p => p.location === location);
            if (category) filtered = filtered.filter(p => p.category === category);
            if (sellerId) filtered = filtered.filter(p => p.sellerId === sellerId);
            res.json(filtered);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST add a new product
router.post('/', async (req, res) => {
    try {
        const { name, price, category, imageUrl, location, sellerName, sellerPhone, sellerId, description } = req.body;

        // Basic validation
        if (!name || !price || !category || !location || !sellerName || !sellerId) {
            return res.status(400).json({ message: 'Missing required fields: name, price, category, location, sellerName, sellerId' });
        }

        if (store.dbConnected) {
            const newProduct = new Product({ name, price, category, imageUrl, location, sellerName, sellerPhone, sellerId, description });
            const saved = await newProduct.save();
            res.status(201).json(saved);
        } else {
            const newProduct = { _id: 'm' + Date.now(), name, price, category, imageUrl, location, sellerName, sellerPhone, sellerId, description, contactCount: 0 };
            store.products.unshift(newProduct);
            res.status(201).json(newProduct);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PATCH increment contact count when buyer clicks "Contact"
router.patch('/:id/contact', async (req, res) => {
    try {
        if (store.dbConnected) {
            const updated = await Product.findByIdAndUpdate(
                req.params.id,
                { $inc: { contactCount: 1 } },
                { new: true }
            );
            if (!updated) return res.status(404).json({ message: 'Product not found' });
            res.json({ contactCount: updated.contactCount });
        } else {
            const p = store.products.find(p => p._id === req.params.id);
            if (p) p.contactCount = (p.contactCount || 0) + 1;
            res.json({ contactCount: p ? p.contactCount : 1 });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE remove a product by ID
router.delete('/:id', async (req, res) => {
    try {
        if (store.dbConnected) {
            const deleted = await Product.findByIdAndDelete(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Product not found' });
            res.json({ message: 'Product deleted successfully' });
        } else {
            const idx = store.products.findIndex(p => p._id === req.params.id);
            if (idx === -1) return res.status(404).json({ message: 'Product not found' });
            store.products.splice(idx, 1);
            res.json({ message: 'Product deleted successfully' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
