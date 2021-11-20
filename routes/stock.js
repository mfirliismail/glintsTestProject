const router = require('express').Router()
const stockController = require('../controllers/stock')



router.post('/in/:id', stockController.createStockIn)
router.post('/out/:id', stockController.createStockOut)
router.get('/history/in/:itemId', stockController.getHistoryStockIn)
router.get('/history/out/:itemId', stockController.getHistoryStockOut)

module.exports = router