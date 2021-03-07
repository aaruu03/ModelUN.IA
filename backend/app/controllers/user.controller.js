//new
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Committee = db.committee; //new


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
  
exports.userBoard = (req, res) => {
  /*getCommitteeCount = (req, res) => {
    const i = 0;
    console.log("incommittecount");
    User.findOne({username: req.body.username}).exec((user) => 
    {
      console.log(i);
      i = user.committees.length;
    });
    return i;
  };
  res.status(200).send({committeeCount: getCommitteeCount()}); */ //CURRENT WIP DO NOT LOOK
  //send committees info
}; 


//new
exports.createc = (req,res) => {

  const committee = new Committee({
    comname: req.body.comname,
    topic: req.body.topic,
    topic2: req.body.topic2,
  });
  console.log(committee);
  console.log(committee.id);
  User.findOneAndUpdate({username: req.body.username}, {$push:{committees: committee._id}}, {new: true}, (err, doc) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }

    console.log(doc);
});
  //send res message committee created
  res.send({ message: "Committee was created successfully!" });
}; 

