const express = require('express')
const { UserRegisters, UserLogin, IsCheckUser, GetPremium } = require('../Controllers/UserController')
const authMiddleware = require('../middleware.js/authMiddleware')
const { GetAllUsers } = require('../Controllers/AdminUserController')
const Router = express.Router()

Router.post('/register',UserRegisters)
Router.post('/login',UserLogin)
Router.get('/ischeck-user',IsCheckUser)
Router.post('/getpremium',GetPremium)
// Admin Router
Router.get("/get-alluser",GetAllUsers)

module.exports = Router