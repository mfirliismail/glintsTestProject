const router = require('express').Router()
const itemController = require('../controllers/item')



router.post('/', itemController.create)
router.get('/', itemController.getAll)
router.get('/:id', itemController.getById)
router.get('/search/:keyword', itemController.searchItem)
router.get('/category/:category', itemController.getAllItemByCategory)
router.put('/:id', itemController.update)
router.delete('/:id', itemController.delete)

module.exports = router