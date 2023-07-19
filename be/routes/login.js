const express = require('express');
const login = express.Router();
const bcrypt = require('bcrypt');
const AuthorModel = require("../models/authorModel")


login.post('/login', async (req, res) => {
    const user = await AuthorModel.findOne({ email: req.body.email })
   
    if (!user) {
        return res.status(404).send({
            statusCode: 404,
            message: 'email or password is invalid'
        })
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) {
        return res.status(400).send({
            statusCode: 400,
            message: 'email or password is invalid'
        })
    }
        res.status(200).send({
            statusCode: 200,
            message: 'Logged Successfully',
            payload: user
        })
});


// ! THE END
module.exports = login;