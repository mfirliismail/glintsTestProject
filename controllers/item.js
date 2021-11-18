const { Item, StockIn, StockOut } = require('../models')
const joi = require('joi')

module.exports = {
    create: async(req, res) => {
        const body = req.body
        try {
            const Schema = joi.object({
                name: joi.string().required(),
                stock: joi.number().required(),
                price: joi.number().required(),
                category: joi.string().required()
            })

            const { error } = Schema.validate({...body }, { abortEarly: false })
            if (error) {
                return res.status(400).json({
                    status: "failed",
                    message: "Bad Request",
                    errors: error['details'].map(
                        ({ message }) => message
                    )
                })
            }
            const findItem = await Item.findOne({
                where: {
                    name: body.name
                }
            })
            if (findItem) {
                return res.status(400).json({
                    status: "failed",
                    message: "Already store item"
                })
            }


            const createItem = await Item.create({
                name: body.name,
                stock: body.stock,
                price: body.price,
                category: body.category
            })
            if (!createItem) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot create item"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "success created item",
                data: createItem
            })

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }

    },
    getAll: async(req, res) => {
        try {
            const findAll = await Item.findAll({
                include: [{
                        model: StockIn
                    },
                    {
                        model: StockOut
                    }
                ]
            })
            if (!findAll) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot find item"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "success retrieved data",
                data: findAll
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    }
}