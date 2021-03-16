const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const Committee = mongoose.model(
    "Committee",
    new Schema({
        userID:{
            type: String,
            required: true
        },
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
            default: " ",
            required: false
        },
        directives: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Directive"
            }
        ],
        date: {
            type: Date,
            default: Date.now
        }
    })
);
module.exports = Committee;
