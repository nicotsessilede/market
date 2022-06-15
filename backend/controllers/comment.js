const Comment = require('../models/Comment');
const Product = require('../models/Product');
const User = require('../models/User');

exports.createComment = (req, res, next) => {
    console.log(req.body);
    const comment = new Comment({
        text: req.body.text,
        author: req.body.author,
        recipient: req.body.recipient
    })

    comment
    .save()
    User.updateOne({_id: req.body.author}, { $push: { comments: comment._id } })
    .then(() => res.status(200).json({message: 'Comment added!'}))
    .catch(error => res.status(500).json({error}))
}

exports.getComments = (req, res, next) => {
    Comment.find()
    .populate('author')
    .populate('recipient')
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(400).json({error}))
}