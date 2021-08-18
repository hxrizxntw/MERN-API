// * Setup Express
const express = require('express')
// * Express Body-Parser
const bodyParser = require('body-parser')
// * Setup Mongoose
const mongoose = require('mongoose');
// * Setup Multer
const multer = require('multer')
// * Setup Express Path
const path = require('path')

// * Setup Express
const app = express()
const port = 4000


// * Routes
const authRoutes = require('./src/routes/auth')
const blogRoutes = require('./src/routes/blog')

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png'
        || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

// * Middleware Body-Parser
app.use(bodyParser.json())
// * Middleware Express Static
app.use('/images', express.static(path.join(__dirname, 'images')))
// * Middleware Multer
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))

// * CORS Handling
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()

})

// *Express Router
app.use('/v1/auth', authRoutes)
app.use('/v1/blog', blogRoutes)

// * Catch error
app.use((error, req, res, next) => {
    const status = error.errorStatus || 500
    const message = error.message
    const data = error.data
    res.status(status).json({ message: message, data: data })
})

mongoose.connect('mongodb+srv://hxrizxnt404:lVSgiyuzf7Vc0zFT@belajar.kmtdu.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => {
        // * Setup Express
        app.listen(port, () => {
            console.log('Connection success')
        })
    })
    .catch(err => console.log(err))
