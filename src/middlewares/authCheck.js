const jwt = require("jsonwebtoken");

module.exports = authCheck = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      res.send({ error: "Not signedIn" });
    }
    (res.locals.signedIn = decoded.access_token),
      (res.locals.user = decoded.userName),
      (res.locals.userId = decoded.userId);
    res.locals.signedIn ? next() : res.send({ error: "Not signedIn" });
  });
};
