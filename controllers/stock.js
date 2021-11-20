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
            if (!createStock) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot insert stock"
                })
            }

            let jumlahStock = findItem.stock + body.stock
            const updateStock = await Item.update({
                stock: jumlahStock
            }, {
                where: {
                    id: id
                }
            })

            return res.status(200).json({
                status: "success",
                message: "success insert a stock"
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
    createStockOut: async(req, res) => {
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

            const createStock = await StockOut.create({
                itemId: id,
                stock: body.stock
            })
            if (!createStock) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot decrease stock"
                })
            }
            let jumlahStock = findItem.stock - body.stock
            const updateStock = await Item.update({
                stock: jumlahStock
            }, {
                where: {
                    id: id
                }
            })

            return res.status(200).json({
                status: "success",
                message: "success decrease stock"
            })

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
    getHistoryStockIn: async(req, res) => {
        const itemId = req.params.itemId
        const sort = req.query.sort
        try {
            if (sort == "terlama") {
                const HistoryStockIn = await Item.findOne({
                    where: {
                        id: itemId
                    },
                    include: [{
                        model: StockIn,
                        order: ["createdAt", "ASC"]
                    }]
                })
                if (!HistoryStockIn) {
                    return res.status(400).json({
                        status: "failed",
                        message: "cannot find stock in"
                    })
                }

                return res.status(200).json({
                    status: "success",
                    message: "success retrieved data",
                    data: HistoryStockIn
                })
            } else {
                const HistoryStockIn = await Item.findOne({
                    where: {
                        id: itemId
                    },
                    include: [{
                        model: StockIn,
                        order: ["createdAt", "ASC"]
                    }]
                })
                if (!HistoryStockIn) {
                    return res.status(400).json({
                        status: "failed",
                        message: "cannot find stock in"
                    })
                }

                return res.status(200).json({
                    status: "success",
                    message: "success retrieved data",
                    data: HistoryStockIn
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
    getHistoryStockOut: async(req, res) => {
        const itemId = req.params.itemId
        const sort = req.query.sort
        try {
            if (sort == "terlama") {
                const HistoryStockOut = await Item.findOne({
                    where: {
                        id: itemId
                    },
                    include: [{
                        model: StockOut,
                        order: ["createdAt", "ASC"]
                    }]
                })
                if (!HistoryStockOut) {
                    return res.status(400).json({
                        status: "failed",
                        message: "cannot find stock in"
                    })
                }

                return res.status(200).json({
                    status: "success",
                    message: "success retrieved data",
                    data: HistoryStockOut
                })
            } else {
                const HistoryStockOut = await Item.findOne({
                    where: {
                        id: itemId
                    },
                    include: [{
                        model: StockOut,
                        order: ["createdAt", "ASC"]
                    }]
                })
                if (!HistoryStockOut) {
                    return res.status(400).json({
                        status: "failed",
                        message: "cannot find stock in"
                    })
                }

                return res.status(200).json({
                    status: "success",
                    message: "success retrieved data",
                    data: HistoryStockOut
                })
            }
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    }
}