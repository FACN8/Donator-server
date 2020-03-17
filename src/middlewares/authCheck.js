const jwt = require("jsonwebtoken");

module.exports = authCheck = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.JWT_SECRET, function(error, decoded) {
    if (error) {
      res.end({ error });
    }
    (res.locals.signedIn = decoded.access_token),
      (res.locals.user = decoded.userName),
      (res.locals.id = decoded.id);

    res.locals.signedIn ? next() : res.end({ error: "Not signedIn" });
  });
};
