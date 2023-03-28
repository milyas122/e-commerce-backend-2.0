const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const User = require("./user");

const Product = sequelize.define("Product", {
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
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
  },
  images: { type: DataTypes.JSON, defaultValue: {} },
  stock: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
    },
  },
  //
});

User.hasMany(Product, {
  foreignKey: "seller",
});

// Favorite Products
User.belongsToMany(Product, {
  through: "favoriteProducts",
  as: "products",
  onDelete: "CASCADE",
});
Product.belongsToMany(User, {
  through: "favoriteProducts",
  as: "users",
  onDelete: "CASCADE",
});

module.exports = Product;
