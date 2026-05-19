const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Used as Unique ID
    password: { type: String, required: true },
    role: { type: String, enum: ['buyer', 'seller'], default: 'buyer' },
    phone: { type: String },
    servicePincodes: [{ type: String }] 
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
