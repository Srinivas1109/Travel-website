const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = new Schema({
    Firstname:{
        type: String,
        required: true
    },
    Lastname:{
        type: String
    },
    Email:{
        type: String,
        required: true,
    },
    Username:{
        type: String,
        required: true,
        unique: true
    },
    MobileNo:{
        type: Number,
        required: true
    },
    Question:{
        type: String,
    },
    Answer:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('Users', UserSchema)
module.exports = User