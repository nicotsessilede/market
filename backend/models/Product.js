const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    userId: {type: String, required: true, ref: 'User'},
    name: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    imageUrl: {type: String, required: true},
    price: {type: Number, required: true},
})

module.exports = mongoose.model('Product', productSchema);