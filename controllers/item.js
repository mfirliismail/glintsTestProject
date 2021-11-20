const { Item, StockIn, StockOut } = require('../models')
const { Op } = require("sequelize");
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
            if (
                error.name === 'SequelizeDatabaseError' &&
                error.parent.routine === 'enum_in'
            ) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Perkakas, Sembako, MCK, Snack, Minuman, Pakaian and Others only for Category Data Item',
                });
            }
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error',
            });
        }

    },
    getAll: async(req, res) => {
        const field = req.query.field
        const sort = req.query.sort
        try {
            if (field == "price" && sort == "termurah") {
                const findTermurah = await Item.findAll({
                    where: {
                        order: [
                            ['price', 'ASC'],
                        ]
                    }
                })
                if (!findTermurah) {
                    return res.status(400).json({
                        status: "failed",
                        message: "cannot find item"
                    })
                }
                return res.status(200).json({
                    status: "success",
                    message: "success retrieved data",
                    data: findTermurah
                })
            } else if (field == "price" && sort == "termahal") {
                const findTermahal = await Item.findAll({
                    where: {
                        order: [
                            ['price', 'DESC'],
                        ]
                    }
                })
                if (!findTermahal) {
                    return res.status(400).json({
                        status: "failed",
                        message: "cannot find item"
                    })
                }
                return res.status(200).json({
                    status: "success",
                    message: "success retrieved data",
                    data: findTermahal
                })
            } else if (field == "stock" && sort == "terbanyak") {
                const findTerbanyak = await Item.findAll({
                    where: {
                        order: [
                            ['stock', 'DESC'],
                        ]
                    }
                })
                if (!findTerbanyak) {
                    return res.status(400).json({
                        status: "failed",
                        message: "cannot find item"
                    })
                }
                return res.status(200).json({
                    status: "success",
                    message: "success retrieved data",
                    data: findTerbanyak
                })
            } else if (field == "stock" && sort == "tersedikit") {
                const findTersedikit = await Item.findAll({
                    where: {
                        order: [
                            ['stock', 'ASC'],
                        ]
                    }
                })
                if (!findTersedikit) {
                    return res.status(400).json({
                        status: "failed",
                        message: "cannot find item"
                    })
                }
                return res.status(200).json({
                    status: "success",
                    message: "success retrieved data",
                    data: findTersedikit
                })
            } else if (field == "date" && sort == "terbaru") {
                const findTerbaru = await Item.findAll({
                    where: {
                        order: [
                            ['createdAt', 'ASC'],
                        ]
                    }
                })
                if (!findTerbaru) {
                    return res.status(400).json({
                        status: "failed",
                        message: "cannot find item"
                    })
                }
                return res.status(200).json({
                    status: "success",
                    message: "success retrieved data",
                    data: findTerbaru
                })
            } else if (field == "date" && sort == "terlama") {
                const findTerlama = await Item.findAll({
                    where: {
                        order: [
                            ['createdAt', 'DESC'],
                        ]
                    }
                })
                if (!findTerlama) {
                    return res.status(400).json({
                        status: "failed",
                        message: "cannot find item"
                    })
                }
                return res.status(200).json({
                    status: "success",
                    message: "success retrieved data",
                    data: findTerlama
                })
            } else {
                const findAll = await Item.findAll()
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
            }

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
    getById: async(req, res) => {
        const id = req.params.id
        try {
            const findById = await Item.findOne({
                where: {
                    id: id
                }
            })
            if (!findById) {
                return res.status(400).json({
                    status: "failed",
                    message: "Id not found"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "success retrieved data",
                data: findById
            })

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
    update: async(req, res) => {
        const body = req.body
        const id = req.params.id
        try {
            const update = await Item.update({
                where: {
                    id: id
                }
            }, {
                name: body.name,
                stock: body.stock,
                price: body.price,
                category: body.category
            })

            if (!update) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot update item"
                })
            }
            const findOne = await Item.findOne({
                where: {
                    id: id
                }
            })

            return res.status(200).json({
                status: "success",
                message: "success updated data",
                data: findOne
            })



        } catch (error) {
            if (
                error.name === 'SequelizeDatabaseError' &&
                error.parent.routine === 'enum_in'
            ) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Perkakas, Sembako, MCK, Snack, Minuman, Pakaian and Others only for Category Data Item',
                });
            }
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error',
            });
        }
    },
    delete: async(req, res) => {
        const id = req.params.id
        try {
            const deleteItem = await Item.destroy({
                where: {
                    id: id
                }
            })
            if (!deleteItem) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot delete item"
                })
            }

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
    getAllItemByCategory: async(req, res) => {
        const category = req.query.category
        try {
            const findAll = await Item.findAll({
                where: {
                    category: category
                }
            })
            if (!findAll) {
                return res.status(400).json({
                    status: "failed",
                    message: "there's no item with category like that"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "success retrieved data",
                data: findAll
            })
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
    searchItem: (req, res) => {
        const keyword = req.query.keyword
        try {
            const find = await Item.find({
                where: {
                    title: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }
            })
            if (!find) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot find item"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "success retrieved data",
                data: find
            })
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
}