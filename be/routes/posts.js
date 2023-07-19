const express = require('express');
const PostModel = require('../models/postModel');
const { postBodyParams, validatePostBody } = require('../middlewares/postValidation');
const post = express.Router();

// ! -----------------------------------------------------------------------------------------------------
// ! Chiamata get singolo elemento RICERCATO
post.get("/posts/title", async (req, res) => {
    const { postTitle } = req.query;

    try {
        const postByTitle = await PostModel.find({
            title: {
                $regex:'.*' + postTitle + '.*',
                $options: 'i',
            }
        })
        if (!postByTitle || postByTitle.length <= 0) {
            return res.status(404).send({
                statusCode: 404,
                message: `Post with title ${postByTitle} not found`
            })
        }
        res.status(200).send({
            statusCode: 200,
            postByTitle
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
// ! Chiamata get http://localhost:5069/posts  http://localhost:5069/posts?page=x&pageSize=y
post.get('/posts', async (req, res) => {

    const {page = 1, pageSize = 3} = req.query
    try {
        const post = await PostModel.find()
        .limit(pageSize)
        .skip((page -1) * pageSize)
        ;

        const totalPosts = await PostModel.count()
        res.status(200).send({
            statusCode: 200,
            count: totalPosts,
            curentPage: +page,
            pageSize: +pageSize,
            posts: post,
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
// ! Chiamata get singolo elemento
post.get("/posts/:postId", async (req, res) => {

    const { postId } = req.params ;

    try {
        const postById = await PostModel.findById(postId)
        res.status(200).send({
            statusCode: 200,
            payload: postById
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
// ! Chiamata post
post.post('/posts', postBodyParams, validatePostBody, async (req, res) => {

    const newPost = new PostModel({
        category: req.body.category,
        title: req.body.title,
        cover: req.body.cover,
        readTime: req.body.readTime,
        author: req.body.author,
        content: req.body.content,
    });

    try {
        const post = await newPost.save();

        res.status(201).send({
            statusCode: 201,
            message: "Post saved successfully",
            payload: post,
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
// ! Chiamata patch (PUT)
post.patch("/posts/:id", async (req, res) => {
    const { id } = req.params;

    const postExist = await PostModel.findById(id);

    if (!postExist) {
        return res.status(404).send({
            statusCode: 404,
            message:`Post with id: ${id}, not found` ,
        })
    }

    try {
        const postId = id;
        const dataToUpdate = req.body;
        const options = { new: true };

        const result = await PostModel.findByIdAndUpdate(postId, dataToUpdate, options);

        res.status(200).send({
            statusCode: 200,
            message: `Post with id: ${postId} updated successfully` ,
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
post.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;

    const postExist = await PostModel.findById(id);

    if (!postExist) {
        return res.status(404).send({
            statusCode: 404,
            message:`Post with id: ${id}, not found` ,
        })
    }

    try {
        const postToDelete = await PostModel.findByIdAndDelete(id);

        res.status(200).send({
            statusCode: 200,
            message: `This post has been deleted`,
            postToDelete
        });

    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server Error", 
            error
        });
    }
});





module.exports = post;