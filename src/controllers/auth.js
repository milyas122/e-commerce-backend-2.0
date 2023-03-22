const { User } = require("../models");
const validate = require("../utils/validate");
const { signupSchema } = require("../utils/validations/auth");

//POST: /auth/signup
async function signup(req, res) {
  try {
    const cleanFields = await validate(signupSchema, req.body);
    delete cleanFields.confirmPassword;

    const [user, created] = await User.findOrCreate({
      where: { email: cleanFields.email },
      defaults: {
        ...cleanFields,
      },
    });

    if (!created) {
      return res.status(400).json({ message: "Email is already exist " });
    }

    return res
      .status(201)
      .json({ user: user, message: "User created successfully " });
  } catch (e) {
    console.log(e);
    if (e.name === "ValidationError") {
      return res.status(422).json({ message: e.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { signup };
