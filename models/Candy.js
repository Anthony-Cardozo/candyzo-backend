const mongoose = require('mongoose');

const candySchema = new mongoose.Schema({
    name: {type: String, required: true },
    description: {type: String, required: false },
    price: {type: Number, required: true },
    weight: {type: Number, required: true}
}, {timestamps: true});

module.exports = mongoose.model('Candy', candySchema);