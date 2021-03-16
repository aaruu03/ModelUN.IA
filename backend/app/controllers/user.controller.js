//new
const config = require("../config/auth.config");
const db = require("../models");
const mongoose = require("mongoose");
const { user } = require("../models");
const User = db.user;
const Role = db.role;
const Committee = db.committee;
const async = require('async');

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
  
/*exports.userBoard = (req, res) => {
  var i = 0;
  var comdata = [];
  User.findOne({userID: global.currUserID}, (err, user) => 
  {
      if (err) {
        console.log("Something wrong!");
      }
      //get committee count
      i = user.committees.length;
      console.log("com count ",{i});

      if(i == 0){
        res.status(200).send({committeeCount: i, committeeData: "You don't have any committees yet!"});
      }

      //test for global var
      console.log("testing global user id: ", currUserID);

      //get committee data

      for(let j = 0; j<user.committees.length; j++){
        var comid = user.committees[j];
        console.log(comid);
        Committee.findById(comid, (err, com) => 
        {
          comdata.push([com.comname, com.topic, com.topic2, com._id]);
          console.log("forloop");
          if(j == user.committees.length - 1){
            console.log("inside", comdata);
            res.status(200).send({committeeCount: i, committeeData: comdata});
          }
        });
      }
  }); 
}; */

exports.userBoard = (req, res) => {
  async.waterfall([
    function getUser(callback){
      User.findOne({userID: global.currUserID}, (err, user) =>{
        if (err) {
          console.log("Something wrong!");
        }
        //get committee count
        i = user.committees.length;
        console.log("com count ",{i});

        if(i == 0){
          res.status(200).send({committeeCount: i, committeeData: "You don't have any committees yet!"});
          return;s
        }
        else{
          comdata = [];
          callback(null, i, 0, user.committees, comdata,);
        }
      });
    },
    function getComs(i, n, usercom, comdata, callback){
      if(n=== i){
        callback(null, i, comdata);
      }
      else{
        Committee.findById(usercom[n], (err, com) => 
        {
          comdata.push([com.comname, com.topic, com.topic2, com._id]);
          n++;
          getComs(i, n, usercom, comdata, callback);
        });
      }
    }
  ], function (err, i, comdata){
    console.log("i", i);
    console.log("comdata", comdata);
    res.status(200).send({committeeCount: i, committeeData: comdata});
  });
}; 



