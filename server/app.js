const express = require('express')
const cors = require('cors')
const api = require('./routes')

require('dotenv').config()
const {PORT, API_URL} = process.env

const app = express()
app.use(express.json())
app.use(cors())
app.use('/', api)

app.listen(PORT, API_URL, () => {
  console.log(`Server running on ${API_URL}:${PORT}`)
})
