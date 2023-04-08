const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const User = require("./user");
const Product = require("./product");

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isUrl: true },
  },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  total: { type: DataTypes.DOUBLE, allowNull: false },
});

User.hasMany(Order, {
  foreignKey: "userId",
  as: "Order",
  allowNull: false,
});
Product.hasMany(Order, {
  foreignKey: "productId",
  as: "Order",
  onDelete: "SET NULL",
});
module.exports = Order;
