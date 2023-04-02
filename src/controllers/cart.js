const db = require("../models");

//POST: /cart/add/:id
async function addToCart(req, res) {
  const productId = req.params.id;
  const userId = req.user.id;
  let quantity = req.body.quantity || 1;
  let total;
  try {
    console.log(db.User.prototype);
    const product = await db.Product.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(400).json({ message: "Product not exist" });
    }
    total = quantity * product.price;
    const user = await db.User.findByPk(userId);
    const isCartExist = await db.Cart.findOne({ where: { userId, productId } });

    if (isCartExist) {
      total += isCartExist.total;
      quantity += isCartExist.quantity;
      await user.setUserCartProducts(product, { through: { quantity, total } });
    } else {
      await user.addUserCartProduct(product, { through: { quantity, total } });
    }

    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error Occurred" });
  }
}

module.exports = { addToCart };
