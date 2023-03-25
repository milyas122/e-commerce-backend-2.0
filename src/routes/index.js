const express = require("express");
const authRoutes = require("./auth");
const userRoutes = require("./user");

const router = express.Router();

router.get("/", (req, res) => res.send("Welcome to e-commerce site"));

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

module.exports = router;
