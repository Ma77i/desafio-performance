const faker = require("faker");
const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
  title: { type: String, default: faker.vehicle.bicycle() },
  description: { type: String, default: faker.commerce.productDescription() },
  price: { type: Number, default: faker.commerce.price(100, 5000) },
  stock: { type: Number, default: 0 },
  code: { type: String, default: faker.vehicle.vin() },
  thumbnail: { type: String, default: faker.image.sports() },
  timestamp: { type: Number, default: Date.now() }
});

const Products = mongoose.model("productos", ProductsSchema);

module.exports = Products


//   // OBTENER TODOS LOS PRODUCTOS
//   async getAll(orderBy = "", search = "") {
//       let products = [];
//       let find = search ?
//           {
//               title: {
//                   $regex: search,
//                   $options: "i",
//               },
//           } :
//           {};
//       if (orderBy) {
//           const ord = {};
//           ord[orderBy] = 1;
//           products = await this.model.find(find).sort(ord);
//       } else {
//           products = await this.model.find(find);
//       }
//       //console.log(products)
//       return products;
//   }

