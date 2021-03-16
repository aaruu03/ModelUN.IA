const config = require("../config/auth.config");
const db = require("../models");
const mongoose = require("mongoose");
const e = require("express");
const User = db.user;
const Committee = db.committee;
const Directive = db.directive;
const async = require('async');

exports.createc = (req,res) => {

    var comid = "";

    const committee = new Committee({
        userID: global.currUserID,
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
  req.body.signatures = req.body.signatures.replace(/\s+/g, '');
  var dirsignatures = req.body.signatures.split(","); 
  console.log("whitespaces", req.body.signatures);
  var privdirtype = "";

  //save directive as public
  if(req.body.dtype === "Public"){
    var directive = new Directive({
      committeeID: req.body.id,
      title: req.body.title,
      dtype: {type: "Public", sponsors: dirsignatures},
      description: req.body.description,
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
  }
//save directive as private
  else{
    if(req.body.dtype === "Private Covert" ? privdirtype = "Covert" : privdirtype = "Overt")
    var directive = new Directive({
      committeeID: req.body.id,
      title: req.body.title,
      dtype: {type:"Private", privtype: privdirtype, signatures: dirsignatures},
      description: req.body.description,
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
  }
};

exports.getDir = (req,res) => {
  async.waterfall([
    function getComDir(callback) {
      Committee.findById(req.body.id, (err, committee) => {
        if(err){
          res.status(500).send({ message: err });
          return;
        }
        else{
          console.log(committee.directives);
          const length = committee.directives.length;
          //  console.log("beoredirdata", dirdata);
          var dirdata = [];
          callback(null, length, 0, dirdata, committee.directives);
        }
        
      }); 
    },
    function getDirDB(length, n, dirdata, comdir, callback) {
      if(n===length){
        console.log("sendDIRDB dirdata", dirdata);
        //return(dirdata);
        callback(null, dirdata);
      }
      else{
        Directive.findById((comdir[n]), (err, directives) => {
          const directive = {
            title: directives.title,
            dtype: (directives.dtype.type === "Public" ? "Public" : ("Private " +  directives.dtype.privtype)),
            description: directives.description,
            signatures: (directives.dtype.type === "Public" ? directives.dtype.sponsors : directives.dtype.signatures),
            actions: directives.actions,
            pass: directives.pass
          };
          console.log("DirDB", directive);
          dirdata.push( directive);
          console.log("DIRDB dirdata", dirdata);
          n++;
          getDirDB(length, n, dirdata, comdir, callback);
        }); 
      }
    }],function(err, results){
    res.status(200).send(results);
  });
};
