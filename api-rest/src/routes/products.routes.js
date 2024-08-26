const express = require('express');
const router = express.Router(); 
const productController = require('../controllers/products.controller');

// Rutas para productos
router
    .get('/', productController.get)
    .get('/:id', productController.getById)
    .post('/', productController.create)
    .put('/:id', productController.update)
    .delete('/:id', productController._delete);

module.exports = router;
