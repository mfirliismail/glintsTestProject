const router = require('express').Router()
const itemRoute = require('./item')
const stockRoute = require('./stock')


router.use('/item', itemRoute)
router.use('/stock', stockRoute)

module.exports = router