const express = require('express');
const router = express.Router();
const candyController = require('../controllers/candyController');

// GET /candies — List all candies
router.get('/', candyController.getAllCandies);

// POST /candies — Add a new candy
router.post('/', candyController.createCandy);

// GET /candies/:id — Get details for one candy
router.get('/:id', candyController.getCandyById);

// PUT /candies/:id — Edit a candy
router.put('/:id', candyController.updateCandy);

// DELETE /candies/:id — Remove a candy
router.delete('/:id', candyController.deleteCandy);

module.exports = router;
