const express = require('express')
const cors = require('cors')
const socket = require('socket.io')
const app = express()


let allowCrossDomain = function (req, res, next) {
   res.header('Access-Control-Allow-Origin', "*");
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type');
   next();
}

app.use(cors())
app.use(allowCrossDomain)
app.use(express.json())


const server = app.listen('8000', () =>{
   console.log('Server running on port 8000')
})
io = socket(server,{
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})
io.on('connection', (socket)=>{
    console.log(socket.id)

   socket.on('join', (data)=>{
       socket.join(data)
       console.log('User Joined Room')
   })

   socket.on('disconnect', ()=>{
       console.log('User disconnected')
  })
})
