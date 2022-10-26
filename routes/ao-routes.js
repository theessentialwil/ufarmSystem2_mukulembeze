const express= require('express');
const router = express.Router(); 
const multer = require('multer');
const connectEnsureLogin = require('connect-ensure-login');
// Importing the User Model or Schema
const Registration = require('../models/User');
const UrbanFarmerUpload = require('../models/Urbanfarmerupload');


// Agricultural Officer Route
router.get('/ao-area', connectEnsureLogin.ensureLoggedIn(), (req, res) => {             // esures login to access agric officer area or dashboard
  req.session.user = req.user;
  if (req.user.role == 'agriculturaofficer') {
    res.render('dash-ao');
  } else {
    res.send('This page is only accessible by Agricultural Officer');
  }
});

module.exports = router; 
