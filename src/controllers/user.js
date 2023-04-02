const db = require("../models");
const validate = require("../utils/validate");
const { updateProfileSchema } = require("../utils/validations/user");

// GET: api/users/all
async function getAllUsers(req, res) {
  const { page = 1 } = req.query;
  const limit = 2;
  const offset = (page - 1) * limit;
  try {
    const { count, rows } = await db.User.findAndCountAll({ offset, limit });

    return res.status(200).json({
      message: "Success",
      users: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (e) {
    return res.status(500).json({ message: "Error Occurred" });
  }
}

// GET: api/users/:id
async function getUser(req, res) {
  const user_id = req.params.id;
  try {
    const user = await db.User.findByPk(user_id);
    return res.status(200).json({ user, message: "success" });
  } catch (e) {
    return res.status(500).json({ message: "Error Occurred " });
  }
}

// PUT: api/users/:id
async function updateProfile(req, res) {
  const id = req.params.id;

  try {
    const cleanFields = await validate(updateProfileSchema, req.body);

    const user = await db.User.update({ ...cleanFields }, { where: { id } })[0];

    if (!user)
      return res.status(500).json({ message: "Unable to update user" });

    return res.status(200).json({ user: user, message: "Updated" });
  } catch (e) {
    const message = e.message || "Internal Server Error";
    return res.status(500).json({ message });
  }
}

// GET: api/users/products/favorite
async function getUserFavoriteProducts(req, res) {
  const userId = req.user.id;
  try {
    const user = await db.User.findByPk(userId);
    console.log(db.User.prototype);
    const favoriteProducts = await user.getFavoriteProducts();

    return res.status(200).json({ favoriteProducts });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error Occurred" });
  }
}

module.exports = {
  getUser,
  getAllUsers,
  updateProfile,
  getUserFavoriteProducts,
};
