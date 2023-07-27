const express = require('express');
const movies = express.Router();
const {Movie, Comments} = require("../models/movieModels");

movies.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).send(movies);
    } catch (error) {
        res.status(500).send(error)
    }
})

movies.post('/movies/create', async (req, res) => {
    const { title } = req.body;

    const movieToSave = new Movie({
        title,
    })

    try {
        const movie = await movieToSave.save()
        res.status(200).send(movie)
    } catch (error) {
        res.status(500).send(error)
    }
});

movies.post('/movies/:id/comments', async (req, res) => {
    try {
        const { id } = req.params;
        const { content, movieId, rating } = req.body

        const comment = new Comments({
            content,
            movieId,
            rating
        })

        const update = {$push: { comments: comment }}

        const updateMovie = await Movie.findOneAndUpdate(
           { _id:id},
            update,
            {new:true}
        );

        await comment.save()
        es.status(200).send(updateMovie)
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = movies