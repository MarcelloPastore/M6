const mongoose = require('mongoose');

const PostModelSchema = mongoose.Schema({
    category: {
        type: String
    },
    title: {
        type: String,
    },
    cover: {
        type: String,
    },
    readTime: {
        value: {
        type: Number,
        default: 0
        },
        unit: {
        type: String,
        default: 'minutes'
        },
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `Author`
    },
    content: {
        type: String,
    },
}, {timestamps: true, strict: true});

module.exports = mongoose.model('Post', PostModelSchema, 'posts');
