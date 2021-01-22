const {Schema, model} = require('mongoose')

const messageSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'sent'
    }
})

module.exports = model('Message', messageSchema)