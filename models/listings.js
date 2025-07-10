const mongoose = require("mongoose");
const Review = require("./reviews.js");
const User = require("../models/user.js");

const ListingSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            required: true,
            // default: "https://plus.unsplash.com/premium_photo-1687960117014-f6463f5b419a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            // set: (v) => {
            //     const link = "https://plus.unsplash.com/premium_photo-1687960117014-f6463f5b419a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            //     // console.log(v);
            //     return v === "" || v === '' ? link : v;
            // }
        }
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    reviews: [
        {

            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"

        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    category: {
        type: String,
        enum : [
            "trending",     
            "farms",
            "rooms",
            "beachfront",
            "iconicCities",
            "amazingView",
            "petFriendly",
            "pools",
            "luxury",
            "surfing",
            "boating"
        ],

    }
});

ListingSchema.post("findOneAndDelete", async (res) => {
    let isDeleted = await Review.deleteMany({ _id: { $in: res.reviews } });
});
const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;