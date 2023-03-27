const db = require("../models");
const validate = require("../utils/validate");
const {
  addProductSchema,
  updateProductSchema,
} = require("../utils/validations/product");

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

// PUT: products/:id
async function updateProduct(req, res) {
  const id = req.params.id;

  try {
    const cleanFields = await validate(updateProductSchema, req.body);

    if ("image" in cleanFields)
      cleanFields["images"] = { ...cleanFields.images };

    console.log(req.user.id);
    const product = await db.Product.update(
      { ...cleanFields },
      { where: { id, seller: req.user.id } }
    );

    if (product[0] === 0)
      return res.status(500).json({ message: "Unable to update product" });

    return res.status(200).json({ message: "Updated" });
  } catch (err) {
    console.log(err);
    const message = err.message || "Unable to update product";
    return res.status(500).json({ message });
  }
}

// GET: /products
async function getAllProducts(req, res) {
  const { page = 1, category } = req.query;
  const limit = 2;
  const offset = (page - 1) * limit;
  // let products;
  try {
    const condition = category ? { category } : {};
    console.log(condition);
    const { count, rows } = await db.Product.findAndCountAll(
      { where: condition },
      offset,
      limit
    );

    return res.status(200).json({
      message: "Success",
      products: rows,
      totalPages: count,
      currentPage: page,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to get product detail" });
  }
}
module.exports = { addProduct, getProduct, updateProduct, getAllProducts };
