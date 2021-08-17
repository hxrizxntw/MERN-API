// * Setup Express
const express = require('express')
// * Setup Validator
const { body } = require('express-validator')

// * Express Router
const router = express.Router()

// * Controller
const blogController = require('../controllers/blog')

// * Routes [POST]: /v1/blog/post
router.post('/post',
    [
        body('title').isLength({ min: 5 }).withMessage('Invalid title'),
        body('body').isLength({min: 5}).withMessage('Invalid input')
    ],
    blogController.createBlogPost)

module.exports = router