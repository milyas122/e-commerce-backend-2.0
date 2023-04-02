const express = require("express");
const cartController = require("../controllers/cart");
const isAuth = require("../middleware/is-auth");

const router = express.Router();
router.post("/add/:id", isAuth, cartController.addToCart);
router.get("/remove/:id", isAuth, cartController.removeFromCart);
router.delete("/delete", isAuth, cartController.deleteCart);

module.exports = router;
