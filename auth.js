const jwt = require("jsonwebtoken");
function auth(req, res, next) {
  try {
    const { authorization } = req.headers;
    const splitToken = authorization.split(" ")[1];

    const decoded = jwt.verify(splitToken, process.env.JWT_KEY);

    req.user = { username: decoded.username };

    next();
  } catch (err) {
    res.send({
      message: "authentification failed",
    });
  }
}

module.exports = auth;
