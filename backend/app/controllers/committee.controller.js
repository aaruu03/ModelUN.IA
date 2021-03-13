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




exports.getCommittee = (req, res) => {
  console.log("committee look up id: ", req.body.id);
  Committee.findById(req.body.id, (err,com) =>
  {
    res.status(200).send({committeeName: com.comname, committeeTopic: com.topic, committeeTopic2: com.topic2} );
  });
}; 
