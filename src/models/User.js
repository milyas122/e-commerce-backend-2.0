const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const bcrypt = require("bcrypt");

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
    set(value) {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(value, salt);
      this.setDataValue("password", hashPassword);
    },
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
});

module.exports = User;
