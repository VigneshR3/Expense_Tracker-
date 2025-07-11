const express = require('express')
const { NewExpense, GetExpense,  } = require('../Controllers/ExpenseController')
const Router = express.Router()

Router.post('/create',NewExpense)
Router.post('/getdata',GetExpense)

module.exports = Router