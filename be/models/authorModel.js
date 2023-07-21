const mongoose = require('mongoose');

const AuthorModelSchema = mongoose.Schema({
    name: {
        type: String,
        requires: true 
    },
    surname: {
        type: String,
        requires: true 
    },
    password: {
        type: String,
        reqires: true
    },
    email: {
        type: String,
        requires: true, 
        unique: true
    },
    dob: {
        type: String,
        requires: true 
    },
    avatar: {
        type: String,
        requires: true 
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: []
    }]
}, {timestamps: true, strict:true});

module.exports = mongoose.model("Author", AuthorModelSchema, "authors");