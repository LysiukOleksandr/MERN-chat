const {Schema, model} = require('mongoose')

const roomSchema = new Schema({
    room:{
        type: String,
        required:true,
        unique: true
    }
})

module.exports = model('Room', roomSchema)