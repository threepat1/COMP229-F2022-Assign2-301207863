//File name: COMP229-F2022-Assign2-301207863
//Author's name: Threepat Kiatkamol
//student ID: 301207863
//Wep app name: https://comp229-f2022-Assign2-30120786.herokuapp.com/employees

let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create a model class
let businesscontactModel = mongoose.Schema(
  {
    contactname: String,
    contactnumber: Number,
    email: String
  },

  {
    collection: "b_contact",
  }
);

//booksmodel to create new book more powerful than just class
module.exports = mongoose.model("BusinessContact", businesscontactModel);
