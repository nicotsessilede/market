const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.post('/', auth, multer, productCtrl.createProduct);
router.put('/:id', auth, multer, productCtrl.modifyProduct);
router.get('/', multer, productCtrl.getAllProducts);
router.get('/:id',  multer, productCtrl.getProduct);
router.delete('/:id', auth, multer, productCtrl.deleteProduct);

module.exports = router;