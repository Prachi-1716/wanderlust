const Listing = require("../models/listings.js");
const Review = require("../models/reviews.js");
const User = require("../models/user.js");
const asyncWrap = require("../utils/asyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const {cloudinary} = require("../cloudConfig.js");

module.exports.showAllListings = asyncWrap(async (req, res, next) => {
    let listings = await Listing.find();
    res.render("listings/listings.ejs", { listings });
});

module.exports.showListing = asyncWrap(async (req, res, next) => {
    let { id } = req.params;
 
    let listing = await Listing.findById(id).populate({
        path: "reviews",
        populate :{
            path: "owner"
        }
    }).populate("owner");

    if(!listing){
        req.flash("error", "listing you requested for does not exists!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
});

module.exports.renderNewForm = (req, res) => {
    // console.log(req.session);
    //console.log(req.user);
    return res.render("listings/new.ejs");
}


module.exports.postNewListing = asyncWrap(async (req, res, next) => {
    //let { title, discription, price, location, country, image } = req.body;
    //let listing = new Listing({title:title, discription:discription, image:image, price:price, location:location, country:country});

    let listing = new Listing(req.body.listing);
    let user = await User.findOne({username: req.user.username});
    listing.owner = user._id;
    listing.image.url = req.file.path;
    listing.image.filename = req.file.filename;  
    let result = await listing.save();
    // console.log(result);
    req.flash("success", "listing saved successfully!");
    res.redirect("/listings");
});

module.exports.rederUpdateForm = asyncWrap(async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/update.ejs", { listing});
});

module.exports.updateListing = asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    let listing = req.body.listing
    let originalListing = await Listing.findById(id);

    if(!originalListing){
        req.flash("error", "listing you requested for does not exists!");
        return res.redirect(303, "/listings");
    }
    Object.assign(originalListing, listing);

    if(req.file){
        await cloudinary.uploader.destroy(originalListing.image.filename);
        originalListing.image.url = req.file.path;
        originalListing.image.filename = req.file.filename; 
    }

    let result = await originalListing.save();
    console.log(result);
    req.flash("success", "listing updated successfully!");
    res.redirect(303, `/listings/${id}/show`);
});

module.exports.deleteListing = asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    await cloudinary.uploader.destroy(originalListing.image.filename);
    let result = await Listing.findByIdAndDelete(id);
    // console.log(result);
    req.flash("success", "listing deleted successfully!");
    return res.redirect(303, `/listings`);
});

module.exports.validateListing = (req, res, next)=>{
    console.log("validate listing");
    let result = listingSchema.validate(req.body);
    if(result.error){
        let errmsg = result.error.details.map(el=>el.message).join(",");
        next(new ExpressError(400, errmsg));
    }
    else{
        next();
    }
}

module.exports.isListingOwner = async(req, res, next)=>{
    console.log("is listing owner");
    let {id} = req.params;
    let listing = await Listing.findById(id).populate("owner");
    //console.log(listing);
    if(listing.owner.username !== req.user.username){
        req.flash("error", "You are not owner of this listing");
        return res.redirect(`/listings/${id}/show`);
    }
    next();
}

module.exports.showListingWithCategory = asyncWrap(async(req, res)=>{
    let {category} = req.params;
    if(category === "all"){
        return res.redirect("/listings");
    }
    let listings = await Listing.find({category: category});
    if(listings.length == 0){
        req.flash("error", "no lising found");
        return res.redirect("/listings");
    }
    res.render("listings/listings", {listings});
});

module.exports.searchListings= asyncWrap(async(req,res)=>{
    let country = (req.query.country || "").trim();
    if(country === "") return res.redirect("/listings");
    let listings = await Listing.find({country: {$regex: country, $options: "i"}});
    res.render("listings/searchListings.ejs", {listings, country});
});