//File name: COMP229-F2022-Assign2-301207863
//Author's name: Threepat Kiatkamol
//student ID: 301207863
//Wep app name: https://comp229-f2022-Assign2-30120786.herokuapp.com/employees

let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let jwt = require("jsonwebtoken");
//create reference to the model (dbschema )
let BusinessContact = require("../models/businesscontact");

// function to display contact list page
module.exports.displayBusinessContactList = (req, res, next) => {
  //find the data from database
  BusinessContact.find((err, contactList) => {
    if (err) {
      return console.error(err);
    } else {
      
      // if found, render page and map and retrieve data
      res.render("business_contact/list", {
        title: "Business Contact List",
        ContactList: contactList,
        displayName: req.user ? req.user.displayName : "",
      });
     
    }
  });
};
// function to display add page
module.exports.addpage = (req, res, next) => {
  //render add page
  res.render("business_contact/add", {
    title: "Add Business Contact List",
    //display user name if login
    displayName: req.user ? req.user.displayName : "",
  });
};
// function to create and add new data
module.exports.addprocesspage = (req, res, next) => {
  //declare collection to map
  let newBusinessContact = BusinessContact({
    contactname: req.body.contactname,
    contactnumber: req.body.contactnumber,
    email: req.body.email,
 
  });
  // create data of collection 
  BusinessContact.create(newBusinessContact, (err, BusinessContact) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //if success, direct to contact list page
      res.redirect("/businesscontactlist");
    }
  });
};

module.exports.displayeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object
  //find id to match data id 
  BusinessContact.findById(id, (err, contactedit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //displau the edit page
      res.render("business_contact/edit", {
        //display the recent data 
        title: "Edit Business Contact List",
        businesscontact: contactedit,
        //if login, show username
        displayName: req.user ? req.user.displayName : "",
      });
    }
  });
};

module.exports.processingeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object
  // map to data collection in database
  let updatebusinesscontact = BusinessContact({
    _id: id,
    contactname: req.body.contactname,
    contactnumber: req.body.contactnumber,
    email: req.body.email,
  });
  //update data and save by data id
  BusinessContact.updateOne({ _id: id }, updatebusinesscontact, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the contact list
      res.redirect("/businesscontactlist");
    }
  });
};
//delete data in the list and database
module.exports.deletepage = (req, res, next) => {
  let id = req.params.id;
  //remove by matching id
  BusinessContact.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //if successful
      //refresh business contact list
      res.redirect("/businesscontactlist");
    }
  });
};
