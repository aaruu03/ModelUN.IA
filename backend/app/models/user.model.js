const mongoose = require("mongoose");
const { nanoid } = require('nanoid');

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      unique: true,
    },
    email: String,
    password: String,
    userID: {type: String, default: () => nanoid() },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    committees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Committee"
      }
    ],
  })
);

module.exports = User;


/*   create a new User: object.save()
find a User by id: User.findById(id)
find User by email: User.findOne({ email: … })
find User by username: User.findOne({ username: … })
find all Roles which name in given roles array: Role.find({ name: { $in: roles } }) */