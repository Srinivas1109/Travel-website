const mongoose = require('mongoose')
const {Schema} = mongoose

const feedback = new Schema({
    Name:{
        type: String,
        required: true
    },
    MobileNo:{
        type: Number,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Message:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Feedback', feedback)