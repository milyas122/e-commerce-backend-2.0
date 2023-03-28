const db = require("../models");

async function addProductToFavorite(req, res) {
  const productId = req.params.id;
  const userId = req.user.id;

  try {
    const product = await db.Product.findByPk(productId);
    const user = await db.User.findByPk(userId);

    if (!product)
      return res.status(400).json({ message: "Product is invalid" });

    await product.addUser(user);

    return res.status(200).json({ message: "Added to favorite successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error Occurred" });
  }
}

module.exports = { addProductToFavorite };
