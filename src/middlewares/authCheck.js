const jwt = require("jsonwebtoken");

module.exports = authCheck = (req, res, next) => {
    const token =req.headers.authorization
    const newToken = token.slice(7,token.length)
  jwt.verify(newToken, process.env.JWT_SECRET, function(error, decoded) {
    if (error) {
        res.end(JSON.stringify({error})) 
    }
    next();
  });
};
