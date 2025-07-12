const express = require('express')
const { NewExpense, GetExpense, UpdateExpense, DeleteOneExpense,  } = require('../Controllers/ExpenseController')
const Router = express.Router()

Router.post('/create',NewExpense)
Router.post('/getdata',GetExpense)
Router.patch('/update',UpdateExpense)
Router.get('/delete/',DeleteOneExpense)

module.exports = Router