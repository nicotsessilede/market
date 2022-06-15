const Product = require('../models/Product');

exports.getProductsFromCategory = (req, res, next) => {
    Product.find({category: req.params.category})
    .then(products => res.status(200).json(products))
    .catch(error => res.status(500).json({error}))
}