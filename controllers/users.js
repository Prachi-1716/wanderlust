const asyncWrap = require("../utils/asyncWrap.js");
const User = require("../models/user.js");

module.exports.renderSignUpForm = (req,res)=>{
    res.render("users/signUp.ejs");
}

module.exports.signUp = async(req, res, next)=>{
    let {username, password, email} = req.body;
    let newUser = new User({
        username: username,
        email: email
    });

    try{
        let registerUser = await User.register(newUser, password);
        req.login(registerUser, (err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            let url = res.locals.redirectUrl || "/listings";
            res.redirect(303, url);
        });
    }catch(err){
        console.log("\n");
        console.dir(err.message);
        req.flash("error", err.message);
        res.redirect(303, "/signUp");
    }
}

module.exports.renderLoginForm = (req, res)=>{
    res.render("users/login");
}

module.exports.login = asyncWrap(async(req, res)=>{
    req.flash("success","Welcome Back to Wanderlust");
    let url = res.locals.redirectUrl || "/listings";
    console.log(url);
    res.redirect(303, url);
});

module.exports.logout = async(req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "successfully logged out");
        res.redirect(303, "/listings");
    });
}