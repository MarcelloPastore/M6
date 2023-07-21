const mongoose = require('mongoose');

const PostModelSchema = mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    readTime: {
        value: {
        type: Number,
        required: false,
        },
        unit: {
        type: String,
        required: false,
        },
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `Author`
    },
    content: {
        type: String,
        required: true,
    },
}, {timestamps: true, strict: true});

module.exports = mongoose.model('Post', PostModelSchema, 'posts');
