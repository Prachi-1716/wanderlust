let isLogedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        //the url user was trying to access
        if (["POST", "DELETE", "PATCH"].includes(req.method)) {
            req.session.redirectUrl = req.get("Referrer");  //previous requst
        } else {
            req.session.redirectUrl = req.originalUrl;
        }
        req.flash("error", "You are not logged in");
        return res.redirect(303, "/login");
    }
    next();
}

let redirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        //console.log(req.method);
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports = {isLogedIn, redirectUrl};