const { object, string, array } = require("yup");

const placeOrderSchema = object().shape({
  cartIdList: array().of(string()).min(1, "At least 1 product id is required"),
});

module.exports = { placeOrderSchema };
