const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isSeller: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  city: DataTypes.STRING,
  phone: DataTypes.STRING,
  address: DataTypes.STRING,
  country: DataTypes.STRING,
  image: DataTypes.STRING,
  //   user cart
});

module.exports = User;
