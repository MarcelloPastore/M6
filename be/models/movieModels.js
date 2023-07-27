const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    content: {
        type: String,
        required:true
    },
    movieId: {
        type: String,
        required:true
    },
    rating: {
        type: Number,
        required:true,
        min: 0,
        max: 5,
        default: 5
    }, 
});

const Comments = mongoose.model('Comments', commentsSchema, "comments");
module.exports.Comments = Comments;

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    comments: [commentsSchema]
}, {timestamps: true, strict: true});

const Movie = mongoose.model('Movie', movieSchema, "movies");
module.exports.Movie = Movie;