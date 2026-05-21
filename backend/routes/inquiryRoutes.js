const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const store = require('../store');

if (!store.inquiries) store.inquiries = [];

router.post('/', async (req, res) => {
    try {
        const {
            productId, productName, sellerId,
            sellerName, sellerPhone, serviceMode
        } = req.body;

        if (!productId || !productName || !sellerId || !sellerName) {
            return res.status(400).json({ message: 'Missing required inquiry fields.' });
        }

        const inquiryId = 'INQ-' + Math.floor(100000 + Math.random() * 900000);
        const normalizedMode = ['pickup', 'whatsapp', 'delivery'].includes((serviceMode || '').toLowerCase())
            ? serviceMode.toLowerCase()
            : 'whatsapp';

        if (store.dbConnected) {
            const inquiry = new Inquiry({
                inquiryId, productId, productName, sellerId, sellerName, sellerPhone: sellerPhone || '', serviceMode: normalizedMode, status: 'new'
            });
            const saved = await inquiry.save();
            return res.status(201).json({ message: 'Inquiry saved', inquiryId: saved.inquiryId, _id: saved._id });
        }

        const inquiry = {
            _id: 'inq-' + Date.now(),
            inquiryId,
            productId,
            productName,
            sellerId,
            sellerName,
            sellerPhone: sellerPhone || '',
            serviceMode: normalizedMode,
            status: 'new',
            createdAt: new Date()
        };
        store.inquiries.unshift(inquiry);
        return res.status(201).json({ message: 'Inquiry saved (memory fallback)', inquiryId, _id: inquiry._id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const { sellerId } = req.query;
        if (store.dbConnected) {
            const query = sellerId ? { sellerId } : {};
            const inquiries = await Inquiry.find(query).sort({ createdAt: -1 }).limit(100);
            return res.json(inquiries);
        }
        const inquiries = sellerId
            ? store.inquiries.filter(i => i.sellerId === sellerId)
            : store.inquiries;
        return res.json(inquiries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:inquiryId', async (req, res) => {
    try {
        if (store.dbConnected) {
            const inquiry = await Inquiry.findOne({ inquiryId: req.params.inquiryId });
            if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
            return res.json(inquiry);
        }

        const inquiry = store.inquiries.find(i => i.inquiryId === req.params.inquiryId);
        if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
        return res.json(inquiry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch('/:inquiryId/status', async (req, res) => {
    try {
        const { status } = req.body;
        const allowed = ['new', 'contacted', 'closed'];
        if (!allowed.includes(status)) {
            return res.status(400).json({ message: 'Invalid inquiry status.' });
        }

        if (store.dbConnected) {
            const updated = await Inquiry.findOneAndUpdate(
                { inquiryId: req.params.inquiryId },
                { status },
                { new: true }
            );
            if (!updated) return res.status(404).json({ message: 'Inquiry not found' });
            return res.json({ inquiryId: updated.inquiryId, status: updated.status });
        }

        const inquiry = store.inquiries.find(i => i.inquiryId === req.params.inquiryId);
        if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
        inquiry.status = status;
        return res.json({ inquiryId: inquiry.inquiryId, status: inquiry.status });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
