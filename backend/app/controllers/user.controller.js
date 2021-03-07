//new
const config = require("../config/auth.config");
const db = require("../models");
const mongoose = require("mongoose");
const { user } = require("../models");
const User = db.user;
const Role = db.role;


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
  
exports.userBoard = (req, res) => {
    var i = 0;
    var comdata = [];
    var subdoc = {};
    console.log(i);
    console.log("incommittecount");
    console.log(req.body);
    User.findOne({username: "orcawhale"}, (err, user) => 
    {
      if (err) {
        console.log("Something wrong when updating data!");
      }
      console.log("found");
      console.log(user);
      //console.log(user.committees);
      //get committee count
      //i = user.committees.length - 1;
      //console.log("com count ",{i});
      //get committee data??
      /*for(let j = 0; j < user.committees.length;j++){
        var comid = user.committees[j];
        console.log({comid});
        Committee.findById({_id: "604474ee066a4f0becc9be68"}, (err, committee) =>
        {
          console.log("entered");
          comdata = comdata + [committee.comname, committee.topic, committee.topic2];
          console.log("comdata after: ", {comdata});
        });
      } */ // WIP IGNORE
      res.status(200).send({committeeCount: i});
    }); 
  //send committees info
}; 


//new
exports.createc = (req,res) => {
  
  console.log(committee);
  console.log(committee._id);
  User.findOneAndUpdate({username: req.body.username}, {$push:{committees: 
    {comname: req.body.comname,
    topic: req.body.topic,
    topic2: req.body.topic2,}}}, {new: true}, (err, doc) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }

    console.log(doc);
});
  //send res message committee created
  res.send({ message: "Committee was created successfully!" });
}; 

