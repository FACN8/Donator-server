const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const { user_model } = require("../models");

exports.addUser = (req, res) => {

  const { username, password, fullName, address, city, phoneNumber } = req.body;
  bcrypt.hash(password, saltRounds, async function(err, hash) {
    if (err) {
      res.send({
        redirect: "/LogIn",
        error: "Error in our server,please contact the owner"
      });
    }
    try {
      await user_model.addNewUser(
        username,
        hash,
        fullName,
        address,
        city,
        phoneNumber
      );

      const user = await user_model.findByUsername(req.body.username);
      const userInformation = {
        userId: user[0].id,
        userName: user[0].user_name,
        access_token: true
      };
      jwt.sign(userInformation, process.env.JWT_SECRET, function(err, token) {
        if (err) {
          res.send({
            redirect: "/LogIn",
            error: "Error in our server,please contact the owner"
          });
        }
        res.send({ redirect: "/OrgInfo", token });
      });
    } catch (e) {
      res.send({ redirect: "/SignUp", error: "user already exist" });
    }
  });
};

exports.authenticate = async (req, res) => {
  try {
    const user = await user_model.findByUsername(req.body.username);
    bcrypt.compare(req.body.password, user[0].password, function(err, result) {
      if (err || !result) {
        res.send({ redirect: "/LogIn", error: "Password is wrong" });
      }
      const userInformation = {
        userId: user[0].id,
        userName: user[0].user_name,
        access_token: true
      };
      jwt.sign(userInformation, process.env.JWT_SECRET, function(err, token) {
        if (err) {
          res.send({
            redirect: "/LogIn",
            error: "Error in our server,please contact the owner"
          });
        }
        res.send({ redirect: "/OrgInfo", token });
      });
    });
  } catch (error) {
    res.send({ redirect: "/LogIn", error: "Username not found" });
  }
};
