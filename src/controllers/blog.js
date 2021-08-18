// * Setup Express Validator
const { validationResult } = require('express-validator')
// * Setup Express Builtin Middleware
const path = require('path')
const fs = require('fs')
const BlogPost = require('../models/blog')

exports.createBlogPost = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const err = new Error('Invalid value!')
        err.errorStatus = 400
        err.data = errors.array()
        throw err
    }

    if (!req.file) {
        const err = new Error('Post must have image!')
        err.errorStatus = 422
        throw err
    }

    const title = req.body.title
    const image = req.file.path
    const body = req.body.body

    const Posting = new BlogPost({
        title, body, image, author: { uid: 1, name: "Willy Hxrizxnt" }
    })

    Posting.save()
        .then(result => {
            res.status(201).json({
                message: "Create Blog Post Succeed",
                data: result
            })
        })
        .catch(err => {
            console.log('err: ', err)
        })

}

exports.getAllBlogPost = (req, res, next) => {
    const currentPage = req.query.page || 1
    const perPage = req.query.perPage || 4
    let totalItems

    BlogPost.find().countDocuments()
        .then(count => {
            totalItems = count
            return BlogPost.find().skip((parseInt(currentPage) - 1) * parseInt(perPage))
                .limit(parseInt(perPage))
        })
        .then(result => {
            res.status(200).json({
                message: 'Blog post data called successfully',
                data: result,
                total_data: totalItems,
                per_page: parseInt(perPage),
                current_page: parseInt(currentPage)
            })
        })
        .catch(err => {
            next(err)
        })
}

exports.getBlogPostByID = (req, res, next) => {
    const postID = req.params.postID

    BlogPost.findById(postID)
        .then(result => {
            if (!result) {
                const error = new Error('Blog post not found!')
                error.errorStatus = 404
                throw error
            }
            res.status(200).json({
                message: 'Blog post data called successfully',
                data: result
            })
        })
        .catch(err => {
            next(err)
        })
}

exports.updateBlogPostByID = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const err = new Error('Invalid value!')
        err.errorStatus = 400
        err.data = errors.array()
        throw err
    }

    if (!req.file) {
        const err = new Error('Post must have image!')
        err.errorStatus = 422
        throw err
    }

    const title = req.body.title
    const image = req.file.path
    const body = req.body.body
    const postID = req.params.postID

    BlogPost.findById(postID)
        .then(post => {
            if (!post) {
                const err = new Error('Blog post not found!')
                err.errorStatus = 404
                throw err
            }
            post.title = title
            post.image = image
            post.body = body

            return post.save()
        })
        .then(result => {
            res.status(200).json({
                message: 'Update succeed',
                data: result
            })
        })
        .catch(err => {
            next(err)
        })
}

exports.deleteBlogPostByID = (req, res, next) => {
    const postID = req.params.postID

    BlogPost.findById(postID)
        .then(post => {
            if (!post) {
                const error = new Error('Blog post not found!')
                error.errorStatus = 404
                throw error
            }
            deleteImage(post.image)
            return BlogPost.findByIdAndRemove(postID)
        })
        .then(result => {
            res.status(200).json({
                message: 'Blog post data deleted successfully',
                data: result
            })
        })
        .catch(err => {
            next(err)
        })
}

const deleteImage = (filePath) => {
    console.log('file path: ', filePath)
    console.log('dirname: ', __dirname)
    // * C:\laragon\www\mern\mern-api\images\1629218656805-neza.jpg
    filePath = path.join(__dirname, '../..', filePath)
    fs.unlink(filePath, err => console.log(err))
}