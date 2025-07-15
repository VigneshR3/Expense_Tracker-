const express = require('express')
const { NewExpense, GetExpense, UpdateExpense, DeleteOneExpense,  } = require('../Controllers/ExpenseController')
const {authMiddleware,isUserMiddlware} = require('../middleware.js/authMiddleware')
const Router = express.Router()

Router.post('/create',authMiddleware,isUserMiddlware,NewExpense)
Router.post('/getdata',authMiddleware,isUserMiddlware,GetExpense)
Router.patch('/update',authMiddleware,isUserMiddlware,UpdateExpense)
Router.get('/delete/' ,authMiddleware,isUserMiddlware,DeleteOneExpense)

module.exports = Router