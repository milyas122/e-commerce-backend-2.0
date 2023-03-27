const express = require("express");
const productController = require("../controllers/product");
const isAuth = require("../middleware/is-auth");
const isSeller = require("../middleware/is-seller");

const router = express.Router();

router.get("/", productController.getAllProducts);
router.post("/add", isAuth, isSeller, productController.addProduct);
router.get("/:id", isAuth, productController.getProduct);
router.put("/:id", isAuth, isSeller, productController.updateProduct);

module.exports = router;
