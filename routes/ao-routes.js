const express= require('express');
const router = express.Router(); 
const multer = require('multer');
const connectEnsureLogin = require('connect-ensure-login');
// Importing the User Model or Schema
const Registration = require('../models/User');
const UrbanFarmerUpload = require('../models/Urbanfarmerupload');


// Agricultural Officer Dashboard Route                                                 Notice in effecting the login that the authentication routes file and this route work together and important is Line 13 that specifies the role as it is in the name attribute of the role field in the signup form
router.get('/ao-area', connectEnsureLogin.ensureLoggedIn(), (req, res) => {             // esures login to access agric officer area or dashboard
  req.session.user = req.user;
  if (req.user.role == 'Agricultural Officer') {
    res.render('dash-ao');
  } else {
    res.send('This page is only accessible by Agricultural Officer');
  }
});

module.exports = router; 
