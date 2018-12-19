const express = require('express')
const router = express.Router()

router.use('/api/v1/posts', require('./question.routes'))

module.exports = router