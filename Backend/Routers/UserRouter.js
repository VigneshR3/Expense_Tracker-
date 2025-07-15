const express = require('express')
const { UserRegisters, UserLogin, IsCheckUser } = require('../Controllers/UserController')
const authMiddleware = require('../middleware.js/authMiddleware')
const Router = express.Router()

Router.post('/register',UserRegisters)
Router.post('/login',UserLogin)
Router.get('/ischeck-user',IsCheckUser)

module.exports = Router