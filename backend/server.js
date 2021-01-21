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

// disconnect function

let users = new Map()
let rooms = new Set()
let messages = new Map()

io.on('connection', (socket) => {
    io.sockets.emit('set_rooms', [...rooms])
    socket.on('join', ({userName, room}) => {

        // let candidateRoom = Array.from(rooms).find(i => i.toLowerCase() === room.toLowerCase())
        // if (!candidateRoom) {
        // messages.set(room, new Map())
        // } else {
        //     room = candidateRoom
        // }

        socket.join(room)
        const user = {id: socket.id, value: userName, room}

        !!users.get(room) ? users.get(room).set(socket.id, userName) : users.set(room, new Map([[socket.id, userName]]))
        io.sockets.to(socket.id).emit('set_user', user)
        io.sockets.to(room).emit('set_users', Array.from(users.get(room), ([id, value]) => ({id, value})))
        io.sockets.emit('set_rooms', [...rooms])
        io.sockets.to(socket.id).emit('get_messages_history', Array.from(messages.get(room).values()))
    })


    socket.on('create__room', ({room, userName}) => {
        if (userName === 'admin') {
            let candidateRoom = Array.from(rooms).find(i => i.toLowerCase() === room.toLowerCase())
            if (!candidateRoom) {
                rooms.add(room)
                messages.set(room, new Map())
                io.sockets.emit('set_rooms', [...rooms])
            }
        }

    })

    socket.on('send_message', async (obj) => {
        const hashMessageId = await bcrypt.hash(obj.messageId, 8)
        const msg = {
            ...obj,
            messageId: hashMessageId,
            status: 'sent'
        }
        delete msg.room
        messages.get(obj.room).set(hashMessageId, msg)
        io.sockets.to(obj.room).emit('get_message', msg)
    })

    socket.on('read_message', ({messageId, authorId}) => {
        io.sockets.to(socket.id).to(authorId).emit('get_read_message', messageId)
    })

    socket.on('search_rooms', (searchValue) => {
        const filteredRooms = [...rooms].filter(i => i.startsWith(searchValue))
        io.sockets.emit('set_rooms', filteredRooms)
    })

    socket.on('send_unread_length', ({messagesLength}) => {
        socket.emit('get_unread_length', messagesLength)
    })

    socket.on('disconnect', () => {
        users.forEach((item, room) => {
            if (item.has(socket.id)) {
                item.delete(socket.id)
                io.sockets.to(room).emit('set_users', Array.from(item, ([id, value]) => ({id, value})))
            }
        })
        console.log('User disconnected')
    })
})
