const express = require("express");
const router = express.Router();
const passport = require("passport");
const {redirectUrl} = require("../middleware.js");

const userControllers = require("../controllers/users.js");


router.route("/signUp")
//sign up form 
.get(userControllers.renderSignUpForm)
//manage sign up
.post(redirectUrl,  userControllers.signUp);

router.route("/login")
//serve login form
.get(userControllers.renderLoginForm)
//manage login
.post(redirectUrl, passport.authenticate("local", {failureRedirect : "/login", failureFlash: true}), userControllers.login);

//logout
router.get("/logout", userControllers.logout);
module.exports = router;