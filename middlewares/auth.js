const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.KEY, (err, decoded) => {
      if (err) return res.status(400).send({ error: err.message });
      else {
        req.body.userId = decoded.userId;
        next();
      }
    });
  } else {
    return res.status(400).send({ msg: "no token provided" });
  }
};

module.exports = { authMiddleware };
