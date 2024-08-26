const express = require('express');
const router = express.Router(); 
const categoryController = require('../controllers/categories.controller');

// Rutas para categorías
router
    .get('/', categoryController.get)
    .get('/:id', categoryController.getById)
    .post('/', categoryController.create)
    .put('/:id', categoryController.update)
    .delete('/:id', categoryController._delete);

module.exports = router;
