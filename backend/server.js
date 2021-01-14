const express = require('express')
const cors = require('cors')
const socket = require('socket.io')
const cryptoRandomString = require('crypto-random-string');
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


const server = app.listen('8000', () => {
    console.log('Server running on port 8000')
})
io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})

let users = []

io.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room)
        const user = {id: socket.id, value: data.user}
        users.push(user)
        io.sockets.emit('set_users', users)
        io.sockets.to(socket.id).emit('set_user', user)
    })

    socket.on('send_message',(data) => {
        socket.to(data.room).emit('receive_message', data.content)
    })

    socket.on('read_message', (data)=>{
        if(data){
            data.status = 'read'
            socket.to('room').emit('receive_read_message', data)
        }
    })

    socket.on('disconnect', () => {
      users = users.filter(i => i.id !== socket.id)
        io.sockets.emit('set_users', users)
        console.log('User disconnected')

    })
})
