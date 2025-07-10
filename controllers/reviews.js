const Review = require("../models/reviews.js");
const Listing = require("../models/listings.js");
const asyncWrap = require("../utils/asyncWrap.js");
const User = require("../models/user.js");

module.exports.postReview = asyncWrap(async(req, res, next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let review = new Review(req.body.review);

    user = await User.findOne({username: req.user.username});
    review.owner = user._id;
    //console.log(user._id, "----------");
    let result = await review.save();
    listing.reviews.push(result);
    await listing.save();
    console.log(result);
    req.flash("success", "review added successfully!");
    res.redirect(`/listings/${listing._id}/show`);
});

module.exports.deleteReview = asyncWrap(async(req, res, next)=>{
    let {id, reviewid} = req.params;
    await Review.findByIdAndDelete(reviewid);
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewid}});
    req.flash("success", "review deleted successfully!");
    res.redirect(`/listings/${id}/show`);
});

module.exports.isReviewOwner = async(req, res, next)=>{
    let {id, reviewid} = req.params;
    let review = await Review.findById(reviewid).populate("owner");
    console.log(review);
    // console.log(req.user);
    if(review.owner.username !== req.user.username){
        req.flash("error", "You can't delete this review");
        return res.redirect(`/listings/${id}/show`);
    }
    next();
}