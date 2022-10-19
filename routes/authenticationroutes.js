const express= require('express');
const router = express.Router(); 
const passport = require('passport');

// Route for Urban Farmer Member Area accessible only after login
router.get("/urbfarmerma", (req, res) => {
  res.render('urbfarmermemberarea');
});


router.get("/login", (req, res) => {
  res.render('login');
});

// Urban farmer Log In
router.post('/login', (req, res) => {
  console.log(req.body);
  // res.redirect('/urbfarmerma');
});

// Urban farmer Logout - this route is attached to logout button in Urban Farmer Member Area
router.post('/urbfarmerlogout', (req, res) => {
  if (req.session) {
    req.session.destroy(function(error) {
      if (error) {
        res.status(400).send("Unable to log out");
      } else {
        return res.redirect('/login');
      }
    })
  }
});

module.exports = router; 
