const { required } = require("joi");
const mongoose = require("mongoose"); 
const User = require("../models/user.js");

const reviewsChema = new mongoose.Schema({
    comment : {
        type: String,
        required: true
    },
    rating :{
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    createdAt : {
        type : Date,
        default: Date.now(),
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref: User,
        required : true
    }

});

const Review = new mongoose.model("Review", reviewsChema);
module.exports = Review;