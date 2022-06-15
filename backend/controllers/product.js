const Product = require('../models/Product');
const fs = require('fs');

exports.createProduct = (req, res, next) => {
    const {userId, description, name, price, category} = req.body;

    console.log(req.body)
    const product = new Product({
        userId: userId,
        description: description,
        category: category,
        name: name,
        price: price,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    console.log(product);
    product
    .save()
    .then(() => res.status(201).json({message: 'Product created!'}))
    .catch((error) => res.status(400).json({ error }))
}


exports.modifyProduct = (req, res, next) => {
    const productObject = req.file ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    }
    Product.updateOne({_id: req.params.id}, {...productObject, _id: req.params.id})
    .then(() => res.status(200).json({message: 'Product sucessfully modified!'}))
    .catch(error => res.status(400).json({error}))
}

exports.getAllProducts = (req, res, next)  => {
    Product.find()
    //populate('userId')
    .then(products => res.status(200).json(products))
    .catch(error => res.status(500).json({error}))
}


exports.getProduct = (req, res, next)  => {
    Product.findOne({_id: req.params.id})
    .populate('userId')
    .then(product => res.status(200).json(product))
    .catch(error => res.status(500).json({error}))
}

exports.deleteProduct = (req, res, next) => {
    Product.findOne({_id: req.params.id})
    .then((product) => {
        if (!product){
            res.status(404).json({error: 'No such product!'})
        }
        if (product.userId !== req.auth.userId){
            res.status(403).json({error: 'Unauthorized request!'})
        }
        const filename = product.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Product.deleteOne({_id: req.params.id})
            .then(() => res.status(200).json({message: 'Product deleted!'}))
            .catch(error => res.status(400).json({error}))
        })
    })
    .catch(error => res.status(500).json({error}))
}