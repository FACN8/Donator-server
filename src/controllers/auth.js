const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const { user_model } = require("../models");

exports.addUser = (req, res, err) => {
  const { username, password, fullName, address, city, phoneNumber } = req.body;
  bcrypt.hash(password, saltRounds, async function(err, hash) {
    try {
      await user_model.addNewUser(username, hash, fullName, address, city, phoneNumber);
      const user = await user_model.findByUsername(req.body.username);

      const userInformation = {
        userId: user[0].id,
        userName: user[0].user_name,
        access_token: true
      };
      jwt.sign(userInformation, process.env.JWT_SECRET, function(err, token) {
        if (err) {
          res.end({
            redirect: "/LogIn",
            error: "Error in our server,please contact the owner"
          });
        }
        res.end({ redirect: "/OrgInfo", token });
      });
    } catch (e) {
      res.end({ redirect: "/SignUp", error: "user already exist" });
    }
  });
};

exports.authenticate = async (req, res) => {
  try {
    const user = await user_model.findByUsername(req.body.username);
    bcrypt.compare(req.body.password, user[0].password, function(err, result) {
      if (err || !result) {
        res.end({ redirect: "/LogIn", error: "Password is wrong" });
      }
      const userInformation = {
        userId: user[0].id,
        userName: user[0].user_name,
        access_token: true
      };
      jwt.sign(userInformation, process.env.JWT_SECRET, function(err, token) {
        if (err) {
          res.end({
            redirect: "/LogIn",
            error: "Error in our server,please contact the owner"
          });
        }
        res.end({ redirect: "/OrgInfo", token });
      });
    });
  } catch (error) {
    res.end({ redirect: "/LogIn", error: "Username not found" });
  }
};
