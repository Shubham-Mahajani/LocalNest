const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    inquiryId:   { type: String, required: true, unique: true },
    productId:   { type: String, required: true },
    productName: { type: String, required: true },
    sellerId:    { type: String, required: true },
    sellerName:  { type: String, required: true },
    sellerPhone: { type: String, default: '' },
    serviceMode: { type: String, enum: ['pickup', 'whatsapp', 'delivery'], default: 'whatsapp' },
    status:      { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' }
}, { timestamps: true });

const Inquiry = mongoose.model('Inquiry', inquirySchema);
module.exports = Inquiry;
