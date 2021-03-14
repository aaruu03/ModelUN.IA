const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const Directive = mongoose.model(
    "Directive",
    new Schema({
        committeeID:{
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        dtype: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        signatures: {
            type: String,
            required: true
        },
        actions:{
            type: String,
            required: true
        },
        pass:{
            type: String,
            required: true
        },
        //delegates:[DelegateSchema],
        date: {
            type: Date,
            default: Date.now
        }
    })
);
module.exports = Directive;
