// const mongoose = require("mongoose");

// const CartSchema = new mongoose.Schema({
//   timestamp: {
//     type: Number,
//     default: Date.now()
//   },
//   product: [String]
// });

// const Cart = mongoose.model("Cart", CartSchema);

// module.exports = Cart;


const mongoose = require('mongoose');
const prodModel = require('./productsModel')

class Cart {
    constructor() {
        const schema = new mongoose.Schema({
            timestamp: {
                type: Number,
                default: Date.now()
            },
            product: [String]
        })

        this.model = mongoose.model("carts", schema)
    }

    async create(prod) {
        try {
            const product = await this.model.create(prod)
            console.log("Carrito creado con exito")
        } catch {
            (err) => console.log(err)
        }
    }

    // OBTENER CARRITO 
    async getCart(id) {
        const pd = await this.getAll()
        const rs = pd.find(i => i.id == id);
        if (!rs) {
            throw new Error("No existe el carrito")
        }
        return rs
    }

    // AGREGAR PRODUCTO AL CARRITO
    async addToCart(id, prod) {
        const cart = await this.getCart(id)
        const idpd = await prodModel.getById(prod)
        cart.product.push(prod)
        await cart.save()
        return cart
    }


    async getAll(orderBy = '', search = '') {
        let products = []
        let find = search ? { title: { $regex: search, $options: "i" }
        } : {}
        if (orderBy) {
            const ord = {}
            ord[orderBy] = 1
            products = await this.model.find(find).sort(ord)
        } else {
            products = await this.model.find(find)
        }
        return products
    }

    async getById(id) {
        let doc = await this.model.find(id);
        if (!doc) {
            throw new Error(`id ${id} no encontrado`);
        }
        return doc
    }

    async updateById(id, obj) {
        const up = await this.model.updateOne({ _id: id }, { $set: obj })
        if (!up) {
            throw new Error(`id ${id} no encontrado`);
        }
        return up
    }

    async deleteById(id, prod) {
        const cart = await this.getCart(id)
        cart.product = cart.product.filter(i => i != prod);
        await cart.save();
        return cart
    }

    async deleteCart(id) {
        const cart = await this.getCart(id)
        const del = await this.model.deleteOne({ _id: id })
        return del
    }


    async deleteAll() {
        try {
            this.model.deleteMany({})
            console.log("Se eliminaron todos los objetos")
        } catch {
            (err) => console.log(err)
        };
    }

}


module.exports = new Cart()