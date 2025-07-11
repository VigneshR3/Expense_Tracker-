const express = require('express')
const { UserRegisters, UserLogin } = require('../Controllers/UserController')
const Router = express.Router()

Router.post('/register ',UserRegisters)
Router.post('/login',UserLogin)

module.exports = Router