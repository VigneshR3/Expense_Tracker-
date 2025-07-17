const express = require('express')
const app = express()
const mongoose = require('mongoose')
const UserRouter = require('./Routers/UserRouter')
const ExpenseRouter = require('./Routers/ExpenseRouter')
 //Database connection
const Database_Connetion = async () => {
  try {
    await mongoose.connect("mongodb+srv://vignesh2003rajendran:1FBPLoBfwmcKjFIf@mydatabase.qfrvzf6.mongodb.net/Expense_DB");
    console.log("Database is create");
  } catch (error) {
    console.log("Database is not create", error);
  }
};
Database_Connetion();
const cors = require('cors')
const PORT = 5000
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
//Routers
app.use('/api/auth',UserRouter)
app.use('/api/expense',ExpenseRouter)
   
 

app.listen(PORT, ()=>{console.log("Server Running on "+PORT)})


