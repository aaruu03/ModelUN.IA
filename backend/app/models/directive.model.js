const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema

const publicDirSchema = new mongoose.Schema({
    type: String,

    sponsors: {
      type: Array,
      required: true
    },
});
const privateDirSchema = new mongoose.Schema({
    type: String,
    privtype: String,
    signatures: {
      type: Array,
      required: true
    },
});

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
            type: {publicDirSchema} || [privateDirSchema] ,
            required: true
        }, 
        description: {
            type: String,
            required: true
        },
      /*  signatures: {
            type: String,
            required: true
        }, */
        actions:{
            type: String,
            required: true
        },
        pass:{
            type: String,
            required: true
        },
//        types:[TypeSchema],
        date: {
            type: Date,
            default: Date.now
        }
    })
);
module.exports = Directive;
