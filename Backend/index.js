const express = require('express')
const app = express()
const mongoose = require('mongoose')
const UserRouter = require('./Routers/UserRouter')
 //Database connection
const Database_Connetion = async () => {
  try {
    await mongoose.connect("");
    console.log("Database is create");
  } catch (error) {
    console.log("Database is not create", error);
  }
};
//Database_Connetion();
const cors = require('cors')
const PORT = 5000
app.use(cors())
//Routers
app.use('/api/auth',UserRouter)
 

app.listen(PORT, ()=>{console.log("Server Running on "+PORT)})


