const express= require('express');
const router = express.Router(); 
const passport = require('passport');

//  Login route
router.get("/login", (req, res) => {
  res.render('login');
});

router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), (req, res) => {
  req.session.user = req.user;
  console.log("This is the current user",   req.session.user);
  res.redirect("/uf-dash");
  });

//    Logout route
router.post("/logout", (req, res) => {
    if(req.session){
        req.session.destroy(function(err){
            if(err){
                res.status(400).send('Unable to logout,Please check your Internet connection');
            } else{
                return res.redirect('/index');
            }
        })
    }
	
});

module.exports = router; 
