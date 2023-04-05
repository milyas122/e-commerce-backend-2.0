const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const Product = require("./product");
const User = require("./user");

const Cart = sequelize.define("Cart", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

User.hasMany(Cart, { foreignKey: "userId", as: "cartProducts" });
Cart.belongsTo(User, { foreignKey: "userId" });

Product.hasMany(Cart, { foreignKey: "productId", as: "userCart" });
Cart.belongsTo(Product, { foreignKey: "productId" });

module.exports = Cart;
