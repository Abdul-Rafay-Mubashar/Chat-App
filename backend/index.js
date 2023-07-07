const Connected = require("./db.js");
const express = require("express");
const cors = require('cors');

// Import socket.io

Connected();
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use('/api/User', require('./routes/UserData'));
app.use('/api/Friend', require('./routes/FriendData'));
app.use('/api/Message', require('./routes/MessageData'));
app.use('/api/Login', require('./routes/LoginCheckData'));


const server = app.listen(port, () => {
  console.log("Connected to server", port);
});

const socketIO = require('socket.io')(server,{
  pingTimeout: 60000,
  cors:{
    origin:'http://localhost:3000'
  }
});

socketIO.on('connection',(socket)=>{
  console.log("Soceket Is Connected")
  socket.on('setup',(UserDatas)=>{
    // console.log(UserDatas._id)
    socket.join(UserDatas._id)
    socket.emit('connected')
  })
  socket.on('join chat',(room)=>{
    // console.log('Joined'+ room)
    socket.join(room)
  })
  socket.on('Typing', (room,name) =>{socket.in(room).emit("Typing",name);console.log(name)});
  
  socket.on('Stop Typing', (room) => socket.in(room).emit("Stop Typing"));

  socket.on('New Message', (room,id,msg) =>{
    socket.in(room).emit("New Message",id,msg)
    console.log(id,msg)
  });


})


