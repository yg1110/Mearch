const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const api = require('./routes')

require('dotenv').config()
const {PORT, API_URL, MONGO} = process.env

const db = mongoose.connection
db.on('error', console.error)
db.once('open', function () {
  console.log('Connected to mongod server')
})
mongoose.connect(MONGO)

const app = express()
app.use(express.json())
app.use(cors())
app.use('/', api)

app.listen(PORT, API_URL, () => {
  console.log(`Server running on ${API_URL}:${PORT}`)
})
