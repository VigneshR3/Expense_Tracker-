const express = require('express')
const { NewExpense, GetExpense, UpdateExpense, DeleteOneExpense, CategoryList, FetchFilterExpense,  } = require('../Controllers/ExpenseController')
const {authMiddleware,isUserMiddlware, isPremiumCheck} = require('../middleware.js/authMiddleware')
const Router = express.Router()

Router.post('/create',authMiddleware,isUserMiddlware,NewExpense)
Router.post('/getdata',authMiddleware,isUserMiddlware,GetExpense)
Router.patch('/update',authMiddleware,isUserMiddlware,UpdateExpense)
Router.get('/delete/' ,authMiddleware,isUserMiddlware,DeleteOneExpense)
Router.get('/getlist/',CategoryList)
Router.post('/filter', isPremiumCheck,FetchFilterExpense)

module.exports = Router