const cartModel = require('../models/cartModel')

module.exports = {

    get: async (req, res) => {
        const { orderBy, search } = req.query
        try {
            const carts = await cartModel.getAll(orderBy, search)
            res.status(201).send(carts)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },

    getCart: async (req, res) => {
        const { id } = req.params
        try {
            await cartModel.getAll()
            const cart = await cartModel.getCart(id)
            res.status(200).send(cart)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },

    post: async (req, res) => {
        const { body } = req
        const cart = cartModel.create(body)
        res.status(200).send(cart)
    },

    postCart: async (req, res) => {
        const { id, idprod } = req.params
        try {
            const cart = cartModel.addToCart(id, idprod)
            res.status(200).send(cart)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },

    deleteCart: async (req, res) => {
        const { id } = req.params
        try {
            const delCart = await cartModel.deleteCart(id)
            console.log("Carrito Borrado", delCart);
            res.status(200).send("Cart deleted")
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    
    deleteProd: async (req, res) => {
        const { id, product } = req.params
        console.log("IDCart: ", id, "IDProd",product)
        try {
            const delPr = await cartModel.deleteById(id, product)
            res.status(200).send(delPr)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },

    deleteAll: async (req, res) => {
        try {
            const del = await cartModel.deleteAll()
            res.status(200).send(del)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
}