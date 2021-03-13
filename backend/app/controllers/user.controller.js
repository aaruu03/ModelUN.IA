//new
const config = require("../config/auth.config");
const db = require("../models");
const mongoose = require("mongoose");
const { user } = require("../models");
const User = db.user;
const Role = db.role;
const Committee = db.committee;


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
  
exports.userBoard = (req, res) => {
  var i = 0;
  var comdata = [];
  //username: req.body.currusername
  console.log("User: " + req.body.currusername);
  User.findOne({userID: global.currUserID}, (err, user) => 
  {
      if (err) {
        console.log("Something wrong when updating data!");
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
          console.log("works! ", com);
          console.log("comdata before: ", {comdata});
          comdata.push([com.comname, com.topic, com.topic2, com._id]);
          console.log("comdata after: ", {comdata});
          if(j == user.committees.length - 1){
            console.log("inside", comdata);
            res.status(200).send({committeeCount: i, committeeData: comdata});
          }
        });
      }
      //return committee count & data
  }); 
};
/*exports.userBoard = (req, res) => {
    var i = 0;
    var comdata = [];
    //finds user
    User.findOne({username: "orcawhales"}, (err, user) => 
    {
      if (err) {
        console.log("Something wrong when updating data!");
      }
      //get committee count
      i = user.committees.length;
      console.log("com count ",{i});
      //get committee data
      for(let j = 0; j < user.committees.length;j++){
        var com = user.committees[j];
        console.log({com});
        //test to see if can get id -> works
        console.log("id: ", com.id);
        //check if comdata retrieve works
        console.log("comdata before: ", {comdata});
        comdata.push([com.comname, com.topic, com.topic2]);
        console.log("comdata after: ", {comdata});
      } 
      res.status(200).send({committeeCount: i, committeeData: comdata});
    }); 
  //send committees info
}; */ //WIP 


