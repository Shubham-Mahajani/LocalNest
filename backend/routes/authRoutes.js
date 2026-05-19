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

        if (store.dbConnected) {
            const newUser = new User({ 
                name, email: uniqueId, password, role: 'seller', phone, servicePincodes 
            });
            await newUser.save();
            return res.status(201).json({ message: "Registered", sellerId: uniqueId, name, phone, servicePincodes });
        } else {
            // Memory fallback
            const newUser = { id: uniqueId, name, phone, password, role: 'seller', servicePincodes };
            store.users.push(newUser);
            return res.status(201).json({ message: "Registered (Memory)", sellerId: uniqueId, name, phone, servicePincodes });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { sellerId, password } = req.body;
        
        if (store.dbConnected) {
            const user = await User.findOne({ email: sellerId, password }); // email field stores uniqueId
            if (!user) return res.status(401).json({ message: "Invalid Seller ID or Password" });
            return res.json({ 
                message: "Login successful", 
                sellerId: user.email, 
                name: user.name, 
                phone: user.phone,
                servicePincodes: user.servicePincodes || []
            });
        } else {
            const user = store.users.find(u => u.id === sellerId && u.password === password);
            if (!user) return res.status(401).json({ message: "Invalid Seller ID or Password" });
            return res.json({ message: "Login successful (Memory)", sellerId: user.id, name: user.name, phone: user.phone, servicePincodes: user.servicePincodes || [] });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
