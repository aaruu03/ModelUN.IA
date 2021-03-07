const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const Committee = mongoose.model(
    "Committee",
    new Schema({
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
    })
);
module.exports = Committee;