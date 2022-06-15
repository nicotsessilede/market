const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    console.log(req.body)
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            username: req.body.username,
            password: hash,
            email: req.body.email,
            number: req.body.number
        });
        user.save()
        .then(() => res.status(201).json({message: 'User created!'}))
        .catch((error) => res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({error}))
}

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (!user){
            return res.status(401).json({error: 'User not found!'})
        }
        bcrypt.compare(req.body.password ,user.password)
        .then(valid => {
            if (!valid){
                return res.status(404).json({error: 'Incorrect password!'})
            }
            res.status(200).json({
                userId: user.id,
                token: jwt.sign(
                    {userId: user._id},
                    'RANDOM_TOKEN_SECRET',
                    {expiresIn: '24h'}
                )
            })
        })
        .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}))
}

exports.getUser = (req, res, next) => {
    User.findById(req.params.id)
    .then(user => {
        if (!user){
            return res.status(404).json({message: 'User Not Found!'})
        }
        return res.status(200).json(user)
    })
}