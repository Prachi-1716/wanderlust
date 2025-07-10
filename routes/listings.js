const express = require("express");
const router = express.Router();
const { isLogedIn } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const asyncWrap = require("../utils/asyncWrap.js");
const upload = multer({ storage });
const User = require("../models/user");

router
  .route("/")
  //index route shows all Listings
  .get(listingController.showAllListings)
  //post new listing
  .post(
    isLogedIn,
    upload.single("listing[image]"),
    listingController.validateListing,
    listingController.postNewListing
  );

//create new listing serves form
router.get("/new", isLogedIn, listingController.renderNewForm);

//show route shows listing in details
router.get("/:id/show", listingController.showListing);

//serve update form
router.get(
  "/:id/edit",
  isLogedIn,
  listingController.isListingOwner,
  listingController.rederUpdateForm
);

router
  .route("/:id")
  //update route
  .patch(
    upload.single("listing[image]"),
    isLogedIn,
    listingController.isListingOwner,
    listingController.validateListing,
    listingController.updateListing
  )
  //delete route
  .delete(
    isLogedIn,
    listingController.isListingOwner,
    listingController.deleteListing
  );

router.get("/categories/:category", listingController.showListingWithCategory);
router.get("/search", listingController.searchListings);
module.exports = router;
