const mongoose = require('mongoose');

const candySchema = new mongoose.Schema({
    name: {type: String, required: true },
    description: {type: String, required: false },
    price: {type: String, required: true },
    weight: {type: Number, required: true},
    price_amount: {type: Number, required: true}
}, {timestamps: true});

module.exports = mongoose.model('Candy', candySchema);