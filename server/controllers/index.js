//File name: COMP229-F2022-Assign2-301207863
//Author's name: Threepat Kiatkamol
//student ID: 301207863
//Wep app name: https://comp229-f2022-Assign2-30120786.herokuapp.com/employees

let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

//enable JWT
let jwt = require("jsonwebtoken");
let DB = require("../config/db");

//create the user model instance
let userModel = require("../models/user");
let User = userModel.User; //alias

/display homepage page/
module.exports.displayHomepage = (req, res, next) => {
  res.render("index", {
    title: "Home",
    //if login , show user name
    displayName: req.user ? req.user.displayName : "",
  });
};
//display about page
module.exports.displayaboutpage = (req, res, next) => {
  res.render("index", {
    title: "About",
    //if login , show user name
    displayName: req.user ? req.user.displayName : "",
  });
};
//display product page
module.exports.displayproductpage = (req, res, next) => {
  res.render("index", {
    title: "Products",
    //if login , show user name
    displayName: req.user ? req.user.displayName : "",
  });
};
//display service page
module.exports.displayservicespage = (req, res, next) => {
  res.render("index", {
    title: "Services",
    //if login , show user name
    displayName: req.user ? req.user.displayName : "",
  });
};
//display contact page
module.exports.displayContactpage = (req, res, next) => {
  res.render("index", {
    title: "Contact",
    //if login , show user name
    displayName: req.user ? req.user.displayName : "",
  });
};
//display login page
module.exports.displayLoginPage = (req, res, next) => {
  // check if the user is already logged in
  if (!req.user) {
    res.render("auth/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
      //if login , show user name
      displayName: req.user ? req.user.displayName : "",
    });
  } else {
    return res.redirect("/");
  }
};
//function to get auth after login
module.exports.processLoginPage = (req, res, next) => {
  //to get auth
  passport.authenticate("local", (err, user, info) => {
    // server err?
    if (err) {
      return next(err);
    }
    // is there a user login error?
    if (!user) {
      req.flash("loginMessage", "Authentication Error");
      return res.redirect("/login");
    }
    req.login(user, (err) => {
      // server error?
      if (err) {
        return next(err);
      }
      //declare data of user
      const payload = {
        id: user._id,
        displayName: user.displayName,
        username: user.username,
        email: user.email,
      };
      //declare auth token by data of user
      const authToken = jwt.sign(payload, DB.Secret, {
        expiresIn: 604800, // 1 week
      });

      /* TODO - Getting Ready to convert to API
      return res.json({
        success: true,
        msg: "User Logged in Successfully!",
        user: {
          id: user._id,
          displayName: user.displayName,
          username: user.username,
          email: user.email,
        },
        token: authToken,
      });*/

      return res.redirect("/businesscontactList");
    });
  })(req, res, next);
};

module.exports.displayRegisterPage = (req, res, next) => {
  // check if the user is not already logged in
  if (!req.user) {
    res.render("auth/register", {
      title: "Register",
      messages: req.flash("registerMessage"),
      //if login , show user name
      displayName: req.user ? req.user.displayName : "",
    });
  } else {
    return res.redirect("/");
  }
};

module.exports.processRegisterPage = (req, res, next) => {
  // instantiate a user object
  let newUser = new User({
    username: req.body.username,
    //password: req.body.password
    email: req.body.email,
    //if login , show user name
    displayName: req.body.displayName,
  });

  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("Error: Inserting New User");
      if (err.name == "UserExistsError") {
        req.flash(
          "registerMessage",
          "Registration Error: User Already Exists!"
        );
        console.log("Error: User Already Exists!");
      }
      return res.render("auth/register", {
        title: "Register",
        messages: req.flash("registerMessage"),
        //if login , show user name
        displayName: req.user ? req.user.displayName : "",
      });
    } else {
      // if no error exists, then registration is successful

      // redirect the user and authenticate them

      /* TODO - Getting Ready to convert to API
      res.json({ success: true, msg: "User Registered Successfully!" });*/

      return passport.authenticate("local")(req, res, () => {
        res.redirect("/businesscontactList");
      });
    }
  });
};

module.exports.performLogout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
