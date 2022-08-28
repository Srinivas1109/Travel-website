const connectToMongo = require('./database')
const express = require('express')
const cors = require('cors')

connectToMongo()

const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/details', require('./routes/bookinginfo'))

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})