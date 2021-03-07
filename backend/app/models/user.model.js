const mongoose = require("mongoose");

const committeeSchema = new mongoose.Schema({
    comname: {
      type: String,
      required: true
    },
    topic: {
        type: String,
        required: true
    },
    topic2: {
        type: String,
        default: "",
        required: false
    },
    totaltime:{
        type: Number,
        default: 0,
        required: true
    },
    gsltime:{
        type: Number,
        default: 0,
        required: true
    },
    //delegates:[DelegateSchema],
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    committees: [committeeSchema],
  })
);



module.exports = User;


/*   create a new User: object.save()
find a User by id: User.findById(id)
find User by email: User.findOne({ email: … })
find User by username: User.findOne({ username: … })
find all Roles which name in given roles array: Role.find({ name: { $in: roles } }) */