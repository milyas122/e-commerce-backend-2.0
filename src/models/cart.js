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

User.belongsToMany(Product, {
  through: Cart,
  as: "userCartProducts",
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Product.belongsToMany(User, {
  through: Cart,
  as: "userCart",
  foreignKey: "productId",
  onDelete: "CASCADE",
});

module.exports = Cart;
