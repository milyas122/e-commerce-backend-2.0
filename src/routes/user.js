const express = require("express");
const userController = require("../controllers/user");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", isAuth, userController.getUser);
router.put("/:id", isAuth, userController.updateProfile);

module.exports = router;
