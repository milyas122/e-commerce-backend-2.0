const express = require("express");
const cartController = require("../controllers/cart");
const isAuth = require("../middleware/is-auth");

const router = express.Router();
router.post("/add/:id", isAuth, cartController.addToCart);

module.exports = router;
