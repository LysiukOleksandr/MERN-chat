const express = require('express')
const cors = require('cors')
const socket = require('socket.io')
const bcrypt = require('bcrypt')
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

let users = new Map()

io.on('connection', (socket) => {
    socket.on('join', ({userName, room}) => {
        const user = {id: socket.id, value: userName, room}

        !!users.get(room) ? users.get(room).set(socket.id, userName) : users.set(room, new Map([[socket.id, userName]]))

        socket.join(room)
        io.sockets.to(socket.id).emit('set_user', user)
        io.sockets.emit('set_users', Array.from(users.get(room), ([id, value]) => ({id, value})))
    })

    socket.on('send_message', async (obj) => {
        const hashMessageId = await bcrypt.hash(obj.messageId, 8)
        const msg = {
            ...obj,
            messageId: hashMessageId,
            status: 'sent'
        }
        io.sockets.to(obj.room).emit('get_message', msg)
    })

    socket.on('read_message', (id) => {
        io.sockets.emit('get_read_message', id)
    })

    // new

    socket.on('disconnect', () => {
        users.forEach((item) => {
            if (item.has(socket.id)) {
                item.delete(socket.id)
                io.sockets.emit('set_users', Array.from(item, ([id, value])=> ({id, value})))
            }
        })

        // io.sockets.emit('set_users', )
        console.log('User disconnected')
    })
})
