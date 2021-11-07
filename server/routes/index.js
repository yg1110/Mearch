const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.json('root')
})

router.get('/api', (req, res) => {
  res.json('api')
})

module.exports = router
