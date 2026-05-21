const express = require('express');
const router = express.Router();
const User = require('../models/User');
const store = require('../store');

// Register and generate Unique Seller ID
router.post('/register', async (req, res) => {
    try {
        const { name, phone, password, pin1, pin2 } = req.body;
        const servicePincodes = [];
        if (pin1) servicePincodes.push(pin1);
        if (pin2) servicePincodes.push(pin2);

        // Generate NEST-XXXX ID
        const uniqueId = "NEST-" + Math.floor(1000 + Math.random() * 9000);

        // Always save to in-memory store so login can always find the user
        const memUser = { id: uniqueId, name, phone, password, role: 'seller', servicePincodes };
        store.users.push(memUser);

        // Also persist to MongoDB if connected
        if (store.dbConnected) {
            try {
                const newUser = new User({
                    name, email: uniqueId, password, role: 'seller', phone, servicePincodes
                });
                await newUser.save();
            } catch (dbErr) {
                console.error('DB save failed, user kept in memory:', dbErr.message);
            }
        }

        return res.status(201).json({ message: "Registered", sellerId: uniqueId, name, phone, servicePincodes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        let { sellerId, password } = req.body;
        sellerId = sellerId ? sellerId.toUpperCase().trim() : '';

        // 1. Try MongoDB if connected
        if (store.dbConnected) {
            const user = await User.findOne({ email: sellerId, password });
            if (user) {
                return res.json({
                    message: "Login successful",
                    sellerId: user.email,
                    name: user.name,
                    phone: user.phone,
                    servicePincodes: user.servicePincodes || []
                });
            }
        }

        // 2. Always fall back to in-memory store (handles race condition where
        //    registration happened before DB connected, or DB is unavailable)
        const memUser = store.users.find(u => u.id === sellerId && u.password === password);
        if (memUser) {
            // Opportunistically sync to DB if now connected
            if (store.dbConnected) {
                try {
                    const exists = await User.findOne({ email: sellerId });
                    if (!exists) {
                        const newUser = new User({
                            name: memUser.name, email: memUser.id, password: memUser.password,
                            role: 'seller', phone: memUser.phone, servicePincodes: memUser.servicePincodes
                        });
                        await newUser.save();
                    }
                } catch (_) { /* non-critical */ }
            }
            return res.json({
                message: "Login successful",
                sellerId: memUser.id,
                name: memUser.name,
                phone: memUser.phone,
                servicePincodes: memUser.servicePincodes || []
            });
        }

        return res.status(401).json({ message: "Invalid Seller ID or Password" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

