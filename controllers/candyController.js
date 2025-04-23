const Candy = require('../models/Candy');

//GET all
exports.getAllCandies = async (req, res) => {
    try {
        const candies = await Candy.find();
        res.json(candies);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

//POST
exports.createCandy = async (req, res) => {
    const candy = new Candy({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        weight: req.body.weight
    });
    try {
        const newCandy = await candy.save();
        res.status(201).json(newCandy);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
};

//GET specific candy 
exports.getCandyById = async (req, res) => {
    try {
        const candy = await Candy.findById(req.params.id);
        if (!candy) return res.status(404).json({ message: 'Candy not found' });
        res.json(candy);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//PUT
exports.updateCandy = async (req, res) => {
    try {
        const updatedCandy = await Candy.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        if(!updatedCandy) return res.status(404).json({message: 'Candy not found'});
        res.json(updatedCandy);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
};

//DELETE
exports.deleteCandy = async (req, res) => {
    try {
        const deletedCandy = await Candy.findByIdAndDelete(req.params.id);
        if(!deletedCandy) return res.status(404).json({message: 'Candy not found'});
        res.json({message: 'Candy deleted successfully'});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
};