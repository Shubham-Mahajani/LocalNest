const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:         { type: String, required: true },
    price:        { type: Number, required: true },
    category:     { type: String, required: true },
    imageUrl:     { type: String, default: '' },
    location:     { type: String, required: true }, // Pincode
    sellerName:   { type: String, required: true },
    sellerPhone:  { type: String, default: '' },
    sellerId:     { type: String, required: true }, // NEST-XXXX
    serviceMode:  { type: String, enum: ['pickup', 'whatsapp', 'delivery'], default: 'whatsapp' },
    description:  { type: String, default: '' },
    contactCount: { type: Number, default: 0 }      // how many buyers clicked Contact
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
