const { User } = require("../models");
const validate = require("../utils/validate");
const { signupSchema, loginSchema } = require("../utils/validations/auth");

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

//POST: /auth/login
async function login(req, res) {
  let existingUser;
  try {
    const cleanFields = await validate(loginSchema, req.body);
    existingUser = await User.findOne({ where: { email: cleanFields.email } });

    if (!existingUser)
      return res.status(400).json({ message: "User not exist" });

    const isValid = await existingUser.verifyPassword(cleanFields.password);
    if (!isValid)
      return res.status(404).json({ message: "Email or password is invalid" });

    const token = await existingUser.generateToken();
    return res
      .status(200)
      .json({ message: "Login Successfully..", token: token });
  } catch (e) {
    console.log(e);
    if (e.name === "ValidationError") {
      return res.status(422).json({ message: e.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { signup, login };
