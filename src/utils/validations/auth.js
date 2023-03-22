const { lazy, object, string, boolean, addMethod } = require("yup");

function checkPassword(message) {
  return this.test("isPasswordMatched", message, function (value) {
    const { path, createError, parent } = this;

    if (value !== parent.password) {
      return createError({ path, message: message ?? "Password not matched" });
    }
    return true;
  });
}

addMethod(string, "isPasswordMatched", checkPassword);

const signupSchema = object().shape({
  name: string().required(),
  email: string().email().required(),
  password: string().min(5).max(20).required(),
  confirmPassword: string().min(5).max(20).isPasswordMatched().required(),
  isSeller: boolean().default(false),
});

const loginSchema = object({
  email: string().email().required(),
  password: string().required(),
});

module.exports = { signupSchema, loginSchema };
