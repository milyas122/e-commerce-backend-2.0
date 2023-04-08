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

// Seller has many products
User.hasMany(Product, {
  foreignKey: "seller",
});

// User has many favorite Product
User.belongsToMany(Product, {
  through: "User_Fav_Product",
  as: "favoriteProducts",
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// A single product is add to favorite by many users
Product.belongsToMany(User, {
  through: "User_Fav_Product",
  as: "usersFavorite",
  foreignKey: "product_id",
  onDelete: "CASCADE",
});

module.exports = Product;
