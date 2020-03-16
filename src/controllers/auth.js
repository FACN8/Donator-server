const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const { findByUsername, addNewUser } = require("../models/User_model.js");

exports.addUser = (req, res, err) => {
  const { username, password, fullName, address, city, phoneNumber } = req.body;
  bcrypt.hash(password, saltRounds, async function(err, hash) {
    try {
      await addNewUser(username, hash, fullName, address, city, phoneNumber);
      res.end(JSON.stringify({ redirect: "/OrgInfo" }));
    } catch (e) {
      res.end(
        JSON.stringify({ redirect: "/SignUp", error: "user already exist" })
      );
    }
  });
};

exports.authenticate = async (req, res) => {
  try {
    const user = await findByUsername(req.body.username);
    bcrypt.compare(req.body.password, user[0].password, function(err, result) {
      if (err) {
        res.end(
          JSON.stringify({ redirect: "/LogIn", error: "Password is wrong" })
        );
      }
      const userInformation = {
        userId: user[0].ID,
        userName: user[0].user_name,
        access_token: true
      };
      jwt.sign(userInformation, process.env.JWT_SECRET, function(err, token) {
        if (err) {
          res.end(
            JSON.stringify({
              redirect: "/LogIn",
              error: "Error in our server,please contact the owner"
            })
          );
        }
        res.cookie("data", token, { HttpOnly: true });
        res.end(JSON.stringify({ redirect: "/OrgInfo" }));
      });
    });
  } catch (error) {
    res.end(
      JSON.stringify({ redirect: "/LogIn", error: "Username not found" })
    );
  }
};

exports.SignUp = (req, res) => {
  console.log(req.body);
  var user_name = req.body.username;
  var password = req.body.password;
  console.log("User name = " + user_name + ", password is " + password);
  res.end("/OrgInfo");
};
