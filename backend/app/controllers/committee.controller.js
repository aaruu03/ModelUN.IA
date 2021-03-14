const config = require("../config/auth.config");
const db = require("../models");
const mongoose = require("mongoose");
const e = require("express");
const User = db.user;
const Committee = db.committee;
const Directive = db.directive;

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

//deletes committee, first from user array, then from committee collection
exports.deleteCommittee = (req, res) => {
  console.log("delete got id", req.body.id);
  User.findOneAndUpdate({userID: global.currUserID}, {$pull: {committees: req.body.id}}, (err, user) => {
    if(err) {
      console.log("Something went wrong when updating and deleting data");
    }
  }); 
  Committee.findByIdAndDelete(req.body.id, (err, committee) => {
    if(err) {
      console.log("Something went wrong when deleting committee");
    }
  });
  res.status(200).send("Committee deleted successfully");
};


exports.addDir = (req, res) => {
  console.log("made it");
  const directive = new Directive({
      committeeID: req.body.id,
      title: req.body.title,
      dtype: req.body.dtype,
      description: req.body.description,
      signatures: req.body.signatures,
      actions: req.body.actions,
      pass: req.body.pass
  });
  console.log("directive", directive);
  directive.save((err, directive) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    else{
      console.log("uyay");
      Committee.findByIdAndUpdate(req.body.id, {$push: {directives: directive._id}}, {new: true}, (err, committee) =>{
          if(err){
            console.log("Something went wrong when updating committee with directive");
          }
          console.log(committee);
      });
    }
    res.send({ message: "dir was created successfully!" });
  });
};