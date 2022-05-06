// import model
const logger = require("../log");
const productModel = require("../models/productsModel");

module.exports = {
  get: async (req, res) => {
    const { orderBy, search } = req.query;
    try {
      const products = await productModel.find(orderBy, search);
      res.status(201).send(products);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;
    console.log("objectID: ", id);
    try {
      const getId = await productModel.getById(id);
      res.status(200).send(getId);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  put: async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    console.log(id, body);
    try {
      const up = await productModel.updateOne({ _id: id, }, { $set: body, });
      res.status(201).send(up);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  post: async (req, res) => {
    const { body } = req;
    if (body) {
      await productModel.create(body);
      res.status(201).redirect("/");
    } else {
      logger.error("No post")
    }
  },

  deleteProd: async (req, res) => {
    const { id } = req.params;
    try {
      await productModel.deleteOne({ _id: id });
      res.status(200).send("Product deleted");
    } catch (err){
      logger.error("No id find")
      res.status(500).send(err);
    }
  },

  deleteAll: async (req, res) => {
    await productModel.deleteMany({});
    res.status(200).send("Se eliminaron todos los objetos");
  }
};
