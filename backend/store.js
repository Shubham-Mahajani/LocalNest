// Fallback Memory Store if MongoDB fails
const memoryDB = {
    dbConnected: false,
    users: [],
    inquiries: [],
    products: [
        { _id: "m1", name: "Homemade Mango Pickle", price: 150, category: "Pickles", location: "400001", sellerName: "Aarti's Kitchen", sellerPhone: "9876543210", sellerId: "NEST-1111", serviceMode: "pickup" },
        { _id: "m2", name: "Diwali Sweets", price: 450, category: "Sweets", location: "400001", sellerName: "Mithai House", sellerPhone: "9123456780", sellerId: "NEST-2222", serviceMode: "delivery" },
        { _id: "m3", name: "Organic Banana Chips", price: 80, category: "Snacks", location: "400002", sellerName: "Kerala Bites", sellerPhone: "9876500000", sellerId: "NEST-3333", serviceMode: "whatsapp" }
    ]
};

module.exports = memoryDB;
