const db = require("../models");
const validate = require("../utils/validate");
const { addProductSchema } = require("../utils/validations/product");

// POST: products/add
async function addProduct(req, res) {
  try {
    const cleanFields = await validate(addProductSchema, req.body);
    const images = { ...cleanFields.images };
    delete cleanFields.images;
    const product = await db.Product.create({ ...cleanFields, images });

    return res
      .status(201)
      .json({ product: product, message: "Added Successfully" });
  } catch (err) {
    console.log(err);
    const message = err.message || "Unable to add product";
    return res.status(500).json({ message });
  }
}

// GET: products/:id
async function getProduct(req, res) {
  const prodId = req.params.id;
  try {
    const product = await db.Product.findByPk(prodId);
    if (!product)
      return res
        .status(201)
        .json({ product: product, message: "Invalid Product Id" });
    return res.status(201).json({ product: product, message: "Success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to get product detail" });
  }
}

module.exports = { addProduct, getProduct };
