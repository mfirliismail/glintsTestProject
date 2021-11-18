const router = require('express').Router()
const itemController = require('../controllers/item')



router.post('/', itemController.create)
router.get('/', itemController.getAll)

module.exports = router