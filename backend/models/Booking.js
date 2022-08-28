const mongoose = require('mongoose')
const {Schema} = mongoose

const Booking = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    Booked:{
        type: String,
        required: true
    },
    MobileNo:{
        type: Number,
        required: true
    },
    Email:{
        type: String,
        required: true,
    },
    Name:{
        type: String,
        required: true
    },
    Days:{
        type: Number,
        required: true
    },
    Ondate:{
        type:String,
        required: true
    },
    From:{
        type:String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Bookings', Booking)