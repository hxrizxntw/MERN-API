// * Setup Express
const express = require('express')

// * Express Router
const router = express.Router()

// * Controller
const authController = require('../controllers/auth')

// * Routes [POST]: /v1/auth/registration
router.post('/registration', authController.register)

module.exports = router