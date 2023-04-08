const express = require("express");
const orderController = require("../controllers/order");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", isAuth, orderController.getUserOrders);
router.post("/place", isAuth, orderController.placeOrder);

module.exports = router;
