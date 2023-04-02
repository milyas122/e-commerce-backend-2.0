const db = require("../models");

//POST: /cart/add/:id
async function addToCart(req, res) {
  const productId = req.params.id;
  const userId = req.user.id;
  let quantity = req.body.quantity || 1;
  let total;
  try {
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

//GET: /cart/remove/:id
async function removeFromCart(req, res) {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    const cartItem = await db.Cart.destroy({ where: { id, userId } });
    if (!cartItem) {
      return res.status(400).json({ message: "Cart Id is invalid" });
    }
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error Occurred" });
  }
}

//DELETE: /cart/delete
async function deleteCart(req, res) {
  const userId = req.user.id;
  try {
    const deleteCount = await db.Cart.destroy({ where: { userId } });
    return res
      .status(200)
      .json({ deleteCount, message: "Deleted Successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error Occurred" });
  }
}

module.exports = { addToCart, removeFromCart, deleteCart };
