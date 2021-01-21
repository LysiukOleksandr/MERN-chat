const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    room: {
        type: String,
        required: true,
        unique: true
    }

})

module.exports = model('User', userSchema)