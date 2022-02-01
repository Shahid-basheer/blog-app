const express = require('express')
const app = express()
const path = require('path')
const db = require('./config/db')
const dotenv = require('dotenv').config({path:'./config/config.env'})
const morgan = require('morgan')
const cors = require('cors')
const userRouter = require('./router/user')
const http = require("http")
const server = http.createServer(app)
const io = require('socket.io')(server,
{cors:{origin:'http://localhost:3000',
method:['GET','POST']}})
db()


let users = [];

const addUser = (userId,socketId)=>{
!users.some(user=>user.userId===userId) &&
users.push({userId,socketId});
}

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const removeUser = (socketId)=>{
  users = users.filter(user=>user.socketId!==socketId)
}

io.on('connection',(socket)=>{
socket.on('addUser',(userId)=>{
  addUser(userId,socket.id)
  socket.emit('getUsers',users)
})



 socket.on("sendMessage", ({ userId, receiverId, text }) => {
   console.log('client send message into server');
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      userId,
      text,
    });
  });




// socket.on("connect_error", (err) => {
//   console.log(`connect_error due to ${err.message}`);
// });

socket.on('disconnect',()=>{
  removeUser(socket.id)
  io.emit('getUsers',users)
})
})


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
server.listen(PORT, () => console.log(`Server is running ${PORT}`))