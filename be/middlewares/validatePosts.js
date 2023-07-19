const isValidPost = (req, res, next) => {
    const errors = [];

    const { title, content, img, author, rate } = req.body;

    if (typeof title !== 'string') {
        errors.push('Post title must be a string')
    }if (typeof content !== 'string' || content.length <= 10) {
        errors.push('Post content must be a string and at least 10 characters long')
    }if (typeof img !== 'string') {
        errors.push('Post img must be png or jpg and must be a string')
    }if (typeof author !== 'string') {
        errors.push('Post author must be a string')
    }if (typeof rate !== 'number') {
        errors.push('Post rate must be a number')
    }

    if (errors.length > 0) {
        res.status(400).json({errors})
    } else {
        next();
    }
}

module.exports =isValidPost;

// ! DEPRECATED -   