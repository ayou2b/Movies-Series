const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorisation.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token not found" });
  }
};
