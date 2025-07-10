const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 5000
app.use(cors())

app.listen(PORT, ()=>{console.log("Server Running on "+PORT)})


