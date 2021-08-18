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
        body('body').isLength({ min: 5 }).withMessage('Invalid body')
    ],
    blogController.createBlogPost)

// * Routes [GET]: /v1/blog/posts?page=1&perPage=4
router.get('/posts', blogController.getAllBlogPost)
// * Routes [GET]: /v1/blog/post/:id
router.get('/post/:postID', blogController.getBlogPostByID)
// * Routes [PUT]: /v1/blog/post/:id
router.put('/post/:postID',
[
    body('title').isLength({ min: 5 }).withMessage('Invalid title'),
    body('body').isLength({ min: 5 }).withMessage('Invalid body')
],
blogController.updateBlogPostByID)
// * Routes [DELETE]: /v1/blog/post/:id
router.delete('/post/:postID', blogController.deleteBlogPostByID)

module.exports = router