const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    productId:   { type: String, required: true },
    name:        { type: String, required: true },
    price:       { type: Number, required: true },
    qty:         { type: Number, required: true, min: 1 },
    sellerName:  { type: String, default: '' },
    sellerId:    { type: String, default: '' },
    image:       { type: String, default: '' }
}, { _id: false });

const orderSchema = new mongoose.Schema({
    orderId:         { type: String, required: true, unique: true }, // LN-XXXXXX
    buyerName:       { type: String, required: true },
    buyerPhone:      { type: String, required: true },
    buyerAddress:    { type: String, required: true },
    buyerPincode:    { type: String, required: true },
    items:           [orderItemSchema],
    subtotal:        { type: Number, required: true },
    deliveryFee:     { type: Number, default: 30 },
    grandTotal:      { type: Number, required: true },
    paymentMethod:   { type: String, enum: ['upi', 'card', 'netbanking', 'cod'], required: true },
    paymentStatus:   { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    status:          { type: String, enum: ['placed', 'processing', 'dispatched', 'delivered', 'cancelled'], default: 'placed' }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
