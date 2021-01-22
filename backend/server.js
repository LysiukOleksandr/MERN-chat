const express = require('express')
const cors = require('cors')
const socket = require('socket.io')
const mongoose = require('mongoose')
const Message = require('./models/Message')
const Room = require('./models/Room')

const app = express()

let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

require('dotenv').config()
app.use(cors())
app.use(allowCrossDomain)
app.use(express.json())

const mongodb = 'mongodb+srv://sasha:gqOLzIkZCekbcSjJ@chat.g5lzu.mongodb.net/Chat?retryWrites=true&w=majority'

mongoose.connect(process.env.MONGODB || mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('MongoDB connected')
}).catch((err) => {
    console.log(err)
})

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
let allRooms = new Set()
let messages = new Map()

io.on('connection', async (socket) => {

    let rooms = await Room.find().select('room')
    rooms = rooms.map(i => ({id: i.id, room: i.room}))

    allRooms = rooms;

    io.sockets.emit('set_rooms', rooms)

    socket.on('join', async ({userName, room}) => {

        const candidate = await Room.findOne({room}).select('room')
        if (candidate) {

            socket.join(room)
            messages.set(room, new Map())
            const user = {id: socket.id, value: userName, room}
            users && users.get(room) ? users.get(room).set(socket.id, userName) : users.set(room, new Map([[socket.id, userName]]))

            io.sockets.to(socket.id).emit('set_user', user)
            io.sockets.to(room).emit('set_users', Array.from(users.get(room), ([id, value]) => ({id, value})))

            let messagesHistory = await Message.find({room}).exec()
            messagesHistory = messagesHistory.map(i => ({
                id: i._id,
                message: i.message,
                authorId: i.authorId,
                author: i.author,
                status: i.status,
            }))

            io.sockets.to(socket.id).emit('get_messages_history', messagesHistory && messagesHistory)
        }
    })


    socket.on('create__room', async ({room, userName}) => {

        const isRoomExist = await Room.find({room: {$regex: new RegExp('^' + room.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '$', 'i')}},);

        if (isRoomExist && isRoomExist.length === 0) {
            if (userName === 'admin') {
                const newRoom = new Room({
                    room
                })

                await newRoom.save()
            }
        }

        const rooms = await Room.find().select('room')
        io.sockets.emit('set_rooms', rooms)

    })

    socket.on('send_message', async (obj) => {
        let msg = await Message.create({...obj})

        const newMsg = {...msg._doc}

        newMsg.id = String(newMsg._id)
        delete newMsg._id

        messages.get(obj.room).set(msg._id, newMsg)
        io.sockets.to(obj.room).emit('get_message', newMsg)
    })

    socket.on('read_message', async ({id, authorId}) => {
        await Message.findOneAndUpdate({_id: id}, {status: 'read'})

        io.sockets.to(socket.id).to(authorId).emit('get_read_message', id)
    })

    socket.on('search_rooms', (searchValue) => {
        const filteredRooms = allRooms && [...allRooms].filter(i => i.room.startsWith(searchValue))
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
