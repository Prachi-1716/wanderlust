const express = require("express");
const router = express.Router({mergeParams: true});
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const {isLogedIn, redirectUrl} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

const validateReview = (req, res, next)=>{
    console.log(req.body);
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errmsg = error.details.map(el=>el.message).join(",");
        next(new ExpressError(400, errmsg));
    }else{
        next();
    }
}

//review post route 
router.post("/", isLogedIn, validateReview, reviewController.postReview);

// review delete route
router.delete("/:reviewid", isLogedIn, redirectUrl, reviewController.isReviewOwner, reviewController.deleteReview);

module.exports = router;