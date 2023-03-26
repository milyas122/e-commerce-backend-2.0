const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  try {
    const token = req.headers["x-auth-token"] || req.headers["authorization"];
    if (!token) {
      return res
        .status(404)
        .json({ message: "Access denied - No token provided" });
    }
    // console.log(process)
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    if (err.name === "JsonWebTokenError") {
      return res.status(404).json({ message: "Provide a valid token" });
    }
    return res.status(404).json({ message: "Provide a valid token" });
  }
};
