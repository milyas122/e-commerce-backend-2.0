const db = require("../models");

module.exports = async function (req, res, next) {
  try {
    const isSeller = req.user.isSeller || false;
    console.log("Seller:", req.user);
    if (!isSeller) {
      return res.status(404).json({ message: "You are not a seller" });
    }
    req.body["seller"] = req.user.id;
    next();
  } catch (err) {
    return res.status(404).json({ message: "Internal Server Error" });
  }
};
