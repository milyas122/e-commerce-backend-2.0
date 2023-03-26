const { object, string, number, array, boolean } = require("yup");

const addProductSchema = object().shape({
  title: string(),
  price: string(),
  images: array()
    .of(string().url())
    .min(1, "At least 1 product id is required"),
  description: string(),
  category: string(),
  stock: number(),
  seller: string().required(),
});

module.exports = { addProductSchema };
