const express = require('express');
const AuthorModel = require("../models/authorModel")
const PostModel = require('../models/postModel');
const author = express.Router()
const bcrypt = require('bcrypt');

// ! ---------------------------------------------------------------------------------------------------
// ! Chiamata get
author.get('/authors', async (req, res) => {

    try {
        const authors = await AuthorModel.find()
        .populate("posts", "category title content")
        res.status(200).send({
            statusCode: 200,
            authors
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server Error", 
            error
        });
    }
});

// todo:-------------------------------------------------------------------------------------------------
author.get('/author/:id/posts', async (req, res) => {
    const { id } = req.params

    const findAuthor = await AuthorModel.findById(id);

    try {
        const findPost = await PostModel.find({"author.name": findAuthor.name})

        res.status(200).send({
            statusCode: 200,
            payload: findPost
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server Error", 
            error
        });
    }

});

// todo:--------------------------------------------------------------------------------------------------
// ! -----------------------------------------------------------------------------------------------------
// ! Chiamata get per nome di autore
author.get('/authors/byName', async (req, res) => {
    const { authorName } = req.query;

    try {
        const authorByName = await AuthorModel.find({name: authorName});
        res.status(200).send({
            statusCode: 200,
            payload: authorByName
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server Error", 
            error
        });
    }
});

// ! -----------------------------------------------------------------------------------------------------
// ! Chiamata get per id autore

author.get('/authors/:id', async (req, res) => {

    const { id } = req.params

    
    try {
        const authorExist = await AuthorModel.findById(id)

        if (!authorExist) {
            return res.status(404).send({
                statusCode: 404,
                message: `Author with id ${id} does not exist`
            });
        }
        res.status(200).send({
            statusCode: 200,
            authorExist
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server Error", 
            error
        });
    }
})

// ! -----------------------------------------------------------------------------------------------------
// ! Chiamata post
author.post('/authors/create', async (req, res) => {

    const salt = await bcrypt.genSalt(10)  // complessità algoritmo
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newAuthor = new AuthorModel({
        name: req.body.name,
        surname: req.body.surname,
        password: hashedPassword,
        email: req.body.email,
        dob: req.body.dob,
        avatar: req.body.avatar
    });

    try {
        const author = await newAuthor.save()
        res.status(201).send({
            statusCode: 201,
            message: "Author created successfully",
            author
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server Error", 
            error
        });
    }
});

// ! ------------------------------------------------------------------------------------------------------
// ! Chiamata patch (PUT)
author.patch('/authors/:id', async (req, res) => {
    const { id } = req.params;

    const authorExist = await AuthorModel.findById(id)

    if (!authorExist) {
        return res.status(404).send({
            statusCode: 404,
            message: `Author with id ${id} does not exist`
        });
    }
    try {
        const dataToUpdate = req.body;
        const options = { new: true };

        const result = await AuthorModel.findByIdAndUpdate(dataToUpdate, id, options);
        res.status(200).send({
            statusCode: 200,
            message: `Author with id: ${authorId} updated successfully` ,
            result
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server Error", 
            error
        });
    }

 });

// ! -----------------------------------------------------------------------------------------------------
// ! Chiamata delete
author.delete('/authors/:id', async (req, res) => {
    const { id } = req.params;

    const authorExist = await AuthorModel.findById(id)

    if (!authorExist) {
        return res.status(404).send({
            statusCode: 404,
            message: `Author with id ${id} does not exist`
        });
    }

    try {
        const authorToDelete = await AuthorModel.findByIdAndDelete(id);
        res.status(200).send({
            statusCode: 200,
            message: `This author has been deleted`,
            authorToDelete
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server Error", 
            error
        });
    }
});

// !  THE END ----------------------------------------------------------------------------------------------
module.exports = author;