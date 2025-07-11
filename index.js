if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const listingController = require("./controllers/listings.js");

const listings = require("./routes/listings.js");
const reviews = require("./routes/reviews.js");
const users = require("./routes/users.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);


const main = async () => {
    try {
        await mongoose.connect(process.env.MONGO_ATLAS_URL);
        console.log("connected to wanderlust");
    } catch (err) {
        console.log(err);
    }
}

main();

let store =  MongoStore.create({
    mongoUrl: process.env.MONGO_ATLAS_URL,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24*60*60
  });
const sessionOPtions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized : true,
    cookie : {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
}

app.use(session(sessionOPtions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.listen(3000, () => {
    console.log("Listening from port 3000");
});


//success alert
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// app.use((req, res, next) => {
//     console.log(`➡️  ${req.method} ${req.originalUrl}`);
//     next();
// });


app.use("/", users);
app.get("/", listingController.showAllListings);

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

app.use((req, res, next)=>{
    next(new ExpressError(404, "Page not Found!"));
});
//error handling middleware
app.use((err, req, res, next) => {
    let { statusCode = 400, message = "something went wrong" } = err;
    res.status(statusCode).render("error", {message});
});