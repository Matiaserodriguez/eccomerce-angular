const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: String, required: false }
});

module.exports = mongoose.model('Product', productSchema);
