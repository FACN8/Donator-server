const jwt = require("jsonwebtoken");

module.exports = authCheck = (req, res, next) => {
    const token =req.headers.authorization
  jwt.verify(token, process.env.JWT_SECRET, function(error, decoded) {
    if (error) {
        res.end(JSON.stringify({error})) 
    }
    (res.locals.signedIn = decoded.access_token),
    (res.locals.user = decoded.userName),
    (res.locals.id = decoded.id);

    next();
  });
};
