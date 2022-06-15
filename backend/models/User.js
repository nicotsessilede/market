const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    profile: {type: String, default: ' http://localhost:3000/images/defaultprofile.png'},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    number: {type: String, required: true},
    products: [{type: String, ref: 'Product'}],
    comments: [{type: String, ref: 'comments'}]
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);