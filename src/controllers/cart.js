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
    const isCartExist = await db.Cart.findOne({ where: { userId, productId } });

    if (isCartExist) {
      total += isCartExist.total;
      quantity += isCartExist.quantity;
      await await db.Cart.update(
        { quantity, total },
        { where: { id: isCartExist.id } }
      );
    } else {
      await db.Cart.create({ productId, userId, quantity, total });
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

// GET: /cart
async function getUserCart(req, res) {
  try {
    const userId = req.user.id;
    const user = await db.User.findByPk(userId);

    const cart = await user.getCartProducts({
      include: [{ model: db.Product }],
      attributes: { exclude: ["userId", "productId"] },
    });

    return res.status(200).json({ cart, message: "Success" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error Occurred" });
  }
}

module.exports = { addToCart, removeFromCart, deleteCart, getUserCart };
