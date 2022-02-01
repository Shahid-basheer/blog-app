const express = require('express')
const app = express()
const path = require('path')
const db = require('./config/db')
const dotenv = require('dotenv').config({path:'./config/config.env'})
const morgan = require('morgan')
const cors = require('cors')
const userRouter = require('./router/user')
db()




app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(express.static(path.join(__dirname, "client", "build")));
app.use('/',userRouter)

app.use((req,res,next)=>{
res.status(404).json('opps!! page not found')
})
  
if (process.env.NODE_ENV === "production") {
  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}




const PORT = process.env.PORT || 2000
app.listen(PORT, () => console.log(`Server is running ${PORT}`))