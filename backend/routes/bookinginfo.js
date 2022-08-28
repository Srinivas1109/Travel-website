const express = require('express')
const router = express.Router()
const fetchdetails = require('../middleware/fetchdetails')
const Booking = require('../models/Booking')
const {body, validationResult} = require('express-validator')

// Route 1: Get All the Details using GET '/api/details/fetchalldetails'. Login required
router.get('/fetchalldetails', fetchdetails, async (req, res)=>{
    try {
        const details = await Booking.find({user: req.user.id})
        res.json(details)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error...!")
    }
})

// Route 2: Add a new details using POST: '/api/details/uploaddetalis'. Login required
router.post('/uploaddetails', fetchdetails,  [
    body('name', 'Enter a Valid Name').isLength({min : 3}),
    body('email', 'Enter a Valid Email').isEmail(),
    body('days', 'Enter a proper number'),
    body('from', 'Enter a proper place').isLength({min : 3}),   
], async (req, res)=>{
    let success = false
    try {
        
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({success, errors:errors.array()})
        let savedBooking = await Booking.create({
            Name: req.body.name,
            MobileNo: req.body.mobile,
            Email: req.body.email,
            Days: req.body.days,
            Ondate: req.body.traveldate,
            Booked: req.body.toplace,
            From: req.body.from,
            user: req.user.id
        })
        success = true
        res.json({savedBooking})
    } catch (error) {
        console.error(error.message)
        res.status(500).json({success, error:"Internal server error in bookinginfo...!"})
    }
    
})

// ROUTE 3: Update details using PUT: "/api/details/updatedetails". Login Required

router.put('/updatedetails/:id', fetchdetails, async (req, res)=>{
    const {days, traveldate, from, toplace} = req.body
    // Create newDetails Object
    try {
        const newDetails = {}
        if(days){newDetails.Days = days}
        if(traveldate){newDetails.Ondate = traveldate}
        if(from){newDetails.From = from}
        if(toplace){newDetails.Booked = toplace}

        // Find the details to updated
        let details = await Booking.findById(req.params.id)
        if(!details){res.status(404).json({success, error:'Not FOund'})}

        if(details.user.toString() !== req.user.id)
            return res.status(401).json({success, error:'Not FOund'})
        success = true
        details = await Booking.findByIdAndUpdate(req.params.id, {$set: newDetails}, {new: true})
        res.json({success, details})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error...!")
    }

})

// ROUTE 4: Delete details using Delete: "/api/detailss/deletedetails". Login Required

router.delete('/deletedetails/:id', fetchdetails, async (req, res)=>{

    try {
        // Find the details to delete
        let success = false
        let details = await Booking.findById(req.params.id)
        if(!details){res.status(404).json({success, error:'Not Found'})}

        // Allowed deletion if exists
        if(details.user.toString() !== req.user.id)
            return res.status(401).json({success, error:'Not Found'});
        success = true
        details = await Booking.findByIdAndDelete(req.params.id)
        res.json({success, details:details})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error...!")
    }

})


module.exports = router
