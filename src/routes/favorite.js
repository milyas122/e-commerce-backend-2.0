const favoriteController = require("../controllers/favorite");
const express = require("express");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/add/:id", isAuth, favoriteController.addProductToFavorite);
router.get("/remove/:id", isAuth, favoriteController.removeProductFromFavorite);

module.exports = router;
