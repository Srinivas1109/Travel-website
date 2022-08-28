const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const User = require('../models/Users')
const jwt = require('jsonwebtoken')
const fetchdetails = require('../middleware/fetchdetails')
const Feedback = require('../models/feedback')

const JWT_SECRET = '$Travel$'

// ROUTE 1: Create a New Account POST "api/auth/login"

router.post('/create', [
    body('username', 'Enter a Valid Username').isLength({ min: 3 }),
    body('fname', 'Enter a Valid Firstname').isLength({ min: 3 }),
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Password must be atleast 5 Characters').isLength({ min: 5 }),
    body('answer', 'Enter a valid input...').isLength({ min: 4 }),
    body('mobile', 'Enter a Valid Mobile Number').isLength({ min: 10, max: 10 })
], async (req, res) => {
    const errors = validationResult(req)
    let success = false
    // if there are any errors return Bad request and the errors
    if (!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array() })
    }

    try {
        // check weather a user this email already exists
        let user = await User.findOne({ Username: req.body.username })
        success = false
        if (user)
            return res.status(400).json({success, error: "Sorry a user with this username already exists" })

        user = await User.create({
            Username: req.body.username,
            Firstname: req.body.fname,
            Lastname: req.body.lname,
            Question: req.body.question,
            Answer: req.body.answer,
            Password: req.body.password,
            Email: req.body.email,
            MobileNo: req.body.mobile
        })

        const data = {
            user: {
                id: user.id
            }
        }
        success = true
        const authtoken = jwt.sign(data, JWT_SECRET)
        res.json({success, authtoken })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({success, error:"Internal server error...!"})
    }

})

// ROUTE 2: Authenticate a User POST "api/auth/login"

router.post('/login', [
    body('username', 'Enter a Valid Username').isLength({ min: 3 }),
    body('password', 'Password must be atleast 5 Characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false
    const { username, password } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        success = false
        return res.status(400).json({success, errors: errors.array() })
    }
    try {
        let user = await User.findOne({ 'Username': username })
        if (!user) {
            success = false
            return res.status(400).json({success, error: "Please try to login with correct Creditentials" })
        }
        if (password != user.Password) {
            success = false
            return res.status(400).json({success, error: "Please try to login with correct Creditentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        success = true
        const authtoken = jwt.sign(data, JWT_SECRET)
        res.json({success, authtoken })

    } catch (error) {
        success = false
        res.status(500).send({success, error:"Internal server error...!"})
    }

})

// ROUTE 3: Get User details using POST "api/auth/getdetails"

router.post('/getdetails', fetchdetails, async (req, res) => {
    let userId = null
    let success = false
    try {
        userId = req.user.id
        const user = await User.findById(userId).select("-Password")
        res.send(user)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).json({success, error:'Internal Server Error'});
    }
})

router.post('/feedback', [
    body('name', 'Enter a Valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('mobile', 'Enter a Valid Mobile Number').isLength({ min: 10, max: 10 }),
    body('message', 'Enter a proper message').isLength({ min: 3 }),
], async (req, res) => {
    const errors = validationResult(req)
    let success = false
    // if there are any errors return Bad request and the errors
    if (!errors.isEmpty())
        return res.status(400).json({success, errors: errors.array() })

    try {
        // check weather a user this email already exists

        let feedback = await Feedback.create({
            Name: req.body.name,
            Email: req.body.email,
            MobileNo: req.body.mobile,
            Message: req.body.message,
        })
        success = true
        res.json(success, feedback)

    } catch (error) {
        console.error(error.message)
        res.status(500).json({success, error:"Internal server error...!"})
    }
})

router.post('/resetpassword', [
    body('username', 'Enter a Valid Name').isLength({ min: 3 }),
    body('question', 'question').isLength({ min: 3 }),
    body('answer', 'Enter a valid answer').isLength({ min: 2 }),
], async (req, res) => {
    const errors = validationResult(req)

    // if there are any errors return Bad request and the errors
    const { username, question, answer } = req.body
    if (!errors.isEmpty())
        return res.status(400).json({success, errors: errors.array() })

    try {
        let user = await User.findOne({ 'Username': username })
        if (!user) {
            success = false
            return res.status(400).json({success, error: "User Not Found...!" })
        }

        if (user.Question !== question)
            {
                success = false
                return res.status(400).json({success, error: "Question Not Found...!" })
            }
        if (user.Answer !== answer)
            {
                success = false
                return res.status(400).json({success, error: "Answer Not Found...!" })
            }

        let userPassword = user.Password
        success = true
        res.json({ success, userPassword })

    } catch (error) {
        success = false
        console.error(error.message)
        res.status(500).json({success, error:"Internal server error...!"})
    }

})


module.exports = router