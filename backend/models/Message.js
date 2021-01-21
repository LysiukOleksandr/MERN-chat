const {Schema, model} = require('mongoose')

const messageSchema = new Schema({
    author:{
        type: String,
        required:true
    },
    authorId:{
        type: String,
        required:true
    },
     message:{
        type: String,
        required:true
    },
    messageId:{
        type:String,
        required:true,
        unique:true
    },
    room: {
        type: String,
        required: true
    }
})

module.exports = model('Message', messageSchema)