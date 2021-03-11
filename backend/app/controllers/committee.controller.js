const config = require("../config/auth.config");
const db = require("../models");
const mongoose = require("mongoose");
const e = require("express");
const User = db.user;
const Committee = db.committee;

exports.createc = (req,res) => {

    var comid = "";

    const committee = new Committee({
        username: req.body.username,
        comname: req.body.comname,
        topic: req.body.topic,
        topic2: req.body.topic2
    });
    
    committee.save((err, committee) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        else{
            console.log("id: " + committee._id);
            comid = committee._id;
            console.log("id2: " + comid);

            console.log("comid: ", comid);
            User.findOneAndUpdate({username: req.body.username}, {$push:{committees: comid}}, {new: true}, (err, user) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                 }
  
                console.log(user);
            });
        } 
    });
    
    //send res message committee created
    res.send({ message: "Committee was created successfully!" });
}; 

/*exports.getCommittees = (req, res) => {
    res.status(200).send("This works");
}; */

/*exports.getCommittees = (req, res) => {
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
}; */ //WIP BEING MODIFIED