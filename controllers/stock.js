const { Item, StockIn, StockOut } = require('../models')


module.exports = {
    createStockIn: async(req, res) => {
        const id = req.params.id
        const body = req.body
        try {
            const findItem = await Item.findOne({
                where: {
                    id: id
                }
            })
            if (!findItem) {
                return res.status(400).json({
                    status: "failed",
                    message: "item cannot found"
                })
            }

            const createStock = await StockIn.create({
                itemId: id,
                stock: body.stock
            })

            let jumlahStock = findItem.stock + body.stock
            const updateStock = await Item.update({
                where: {
                    id: id
                }
            }, {
                stock: jumlahStock
            })

            return res.status(200).json({
                status: "success",
                message: "success insert a stock"
            })

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    }
}