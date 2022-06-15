const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    author: {type: String, required: true, ref: 'User'},
    text: {type: String, required: true},
    recipient: {type: String, required: true, ref: 'User'}
})

module.exports = mongoose.model('Comment', commentSchema);