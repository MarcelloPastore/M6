const {body, validationResult} = require("express-validator");

const postBodyParams = [
    body("title")
        .notEmpty()
        .isString()
        .isLength({min: 5})
        .withMessage("Title is required and must be 5 characters"),

    body("category")
        .notEmpty()
        .isString()
        .withMessage("Title is required"),

    body("cover") 
        .notEmpty()
        .isString()
        .withMessage("Img is required "),

    body("content")
        .notEmpty()
        .isString()
        .isLength({min: 20})
        .withMessage("Content is required and must be 20 characters long"),

];


const validatePostBody = (req, res ,next ) => { 
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    next()
}

module.exports = {postBodyParams, validatePostBody};


