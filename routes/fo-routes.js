const express= require('express');
const router = express.Router(); 
const multer = require('multer');
const connectEnsureLogin = require('connect-ensure-login');
// Importing the User Model or Schema
const Registration = require('../models/User');
const UrbanFarmerUpload = require('../models/Urbanfarmerupload');


// Agricultural Officer Route
// In case two people can access, use || (or) in the if statement if (req.user.role == 'farmerone' || req.user.role == 'agriculturofficer');
router.get('/fo-area', connectEnsureLogin.ensureLoggedIn(), (req, res) => {          // // esures login to access farmer one area or dashboard           
  req.session.user = req.user;
  if (req.user.role == 'farmerone') {
    res.render('dash-fo');
  } else {
    res.send('This page is only accessible by Farmer One');
  }
});


module.exports = router; 
