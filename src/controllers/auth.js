const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

// use these functions to manipulate our database
//const { findByUsername, addNewUser } = require("../models/users/User.model");

exports.loginPage = (req, res) => {
    res.redirect("/Login");
};
exports.registerPage = (req, res) => {
    res.redirect("/SignUp");
};

// This function handles the POST /addUser route
// checks if the password and confirmPassword are equal if not send back
// a proper error message
// hash the password, then add the new user to our database using the v addNewUser method
// make sure to handle any error that might occured
exports.addUser = (req, res, err) => {
  const { username, password, fullName, address, city, phoneNumber}= req.body;
    bcrypt.hash(password, saltRounds, async function(err, hash) {
      try {
      //  await addNewUser(username, hash, fullName, address, city, phoneNumber);

        res.end(JSON.stringify({redirect:"/OrgInfo"}));
      } catch (e) {
        res.end(JSON.stringify({redirect:"/SignUp",error:"user already exist"}));
        //user already exist
      }
    });
};

// this function handles the POST /authenticate route
// it finds the user in our database by his username that he inputed
// then compares the password that he inputed with the one in the db
// using bcrypt and then redirects back to the home page
// make sure to look at home.hbs file to be able to modify the home page when user is logged in
// also handle all possible errors that might occured by sending a message back to the cleint
exports.authenticate = async (req, res) => {
  try {
  //  const user = await findByUsername(req.body.username);
    bcrypt.compare(req.body.password, user.password, function(err, result) {
      if (err) {
        res.end(JSON.stringify({redirect:"/LogIn",error:"Password is wrong"}));
      }
      const userInformation = {
        userId: user.id,
        userName: user.username,
        access_token: true
      };
      jwt.sign(userInformation, process.env.JWT_SECRET, function(err, token) {
        if (err) {
            res.end(JSON.stringify({redirect:"/LogIn",error:"Error in our server,please contact the owner"}));
        }
        res.cookie("data", token, { HttpOnly: true });
        res.end(JSON.stringify({redirect:"/OrgInfo"}));
      });
    });
  } catch (error) {
    res.end(JSON.stringify({redirect:"/LogIn",error:"Username not found"}));
  }
};

exports.SignUp = (req, res) => {
    console.log(req.body)
    var user_name=req.body.username;
    var password=req.body.password;
    console.log("User name = "+user_name+", password is "+password);
    res.end("/OrgInfo");
};
