const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middlewares/auth')

router.post('/', auth, commentCtrl.createComment );
router.get('/', commentCtrl.getComments)

module.exports = router;