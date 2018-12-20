const express = require('express')
const router = express.Router()

router.use('/api/v1/questions', require('./questions.routes'))

module.exports = router