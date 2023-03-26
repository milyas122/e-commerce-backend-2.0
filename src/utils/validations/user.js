const { object, string } = require("yup");

const updateProfileSchema = object().shape({
  name: string(),
  address: string(),
  city: string(),
  phone: string(),
  country: string(),
  image: string().url(),
});

module.exports = { updateProfileSchema };
