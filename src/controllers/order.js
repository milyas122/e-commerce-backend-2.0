const db = require("../models");
const { placeOrderSchema } = require("../utils/validations/order");
const validate = require("../utils/validate");
const { Op } = require("sequelize");

// GET: /orders
async function getUserOrders(req, res) {
  const userId = req.user.id;

  try {
    const user = await db.User.findByPk(userId);
    const orders = await user.getOrder();
    return res.status(200).json({ orders, message: "Success" });
  } catch (e) {
    console.log(e);
    return res.status(200).json({ message: "Error Occurred" });
  }
}

// POST: /orders/place
async function placeOrder(req, res) {
  let orderCart = {},
    cart,
    product;

  try {
    const { cartIdList } = await validate(placeOrderSchema, req.body);

    cart = await db.Cart.findAll({
      where: {
        id: {
          [Op.in]: cartIdList,
        },
      },
      attributes: ["id", "quantity", "total"],
      include: {
        model: db.Product,
        attributes: ["id", "title", "price", "images"],
        raw: true,
      },
    });
    cart = cart.map((cartItem) => {
      product = { ...cartItem.Product.dataValues };

      orderCart.price = product.price;
      orderCart.title = product.title;
      orderCart.imageUrl = product.images["0"];
      orderCart["total"] = orderCart["price"] * cartItem.quantity;
      orderCart["quantity"] = cartItem.quantity;
      orderCart.userId = req.user.id;
      orderCart.productId = product.id;
      return orderCart;
    });

    const placeOrder = await db.Order.bulkCreate(cart);
    await db.Cart.destroy({
      where: {
        id: {
          [Op.in]: cartIdList,
        },
      },
    });
    return res
      .status(200)
      .json({ order: placeOrder.length, message: "Success" });
  } catch (err) {
    console.log(err);
    const message = err.message || "Internal Server Error";
    return res.status(500).json({ message });
  }
}

module.exports = { placeOrder, getUserOrders };
