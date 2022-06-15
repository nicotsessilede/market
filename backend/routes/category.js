const express = require('express');
const router = express.Router();
const categoryCtrl = require('../controllers/category');

router.get('/:category', categoryCtrl.getProductsFromCategory);

module.exports = router;