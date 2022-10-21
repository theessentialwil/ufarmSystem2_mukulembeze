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
  if (req.user.role == 'agriculturaofficer') {
        res.redirect("/ao-area");
  } else if (req.user.role == 'farmerone') {
        res.redirect('/fo-area');
  } else if (req.user.role == 'urbanfarmer') {
        res.redirect('/uf-dash');
  } else {
    res.send('Sorry either your session has expired or you are not a registered user.')
  }
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
