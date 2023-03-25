const db = require("../models");

// get all users
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

// get user by Id
async function getUser(req, res) {
  const user_id = req.params.id;
  try {
    const user = await db.User.findByPk(user_id);
    return res.status(200).json({ user, message: "success" });
  } catch (e) {
    return res.status(500).json({ message: "Error Occurred " });
  }
}
// update profile
// favorite products

module.exports = { getUser, getAllUsers };
