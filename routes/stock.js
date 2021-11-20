const router = require('express').Router()
const stockController = require('../controllers/stock')



router.post('/', stockController.createStockIn)


module.exports = router