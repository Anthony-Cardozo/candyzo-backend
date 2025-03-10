const mongoose = require('mongoose');

const candySchema = new mongoose.Schema({
    name: {type: String, required: true },
    flavor: {type: String, required: true },
    price: {type: Number, required: true }
}, {timestamps: true});

module.exports = mongoose.model('Candy', candySchema);