const express= require('express');
const router = express.Router(); 
const multer = require('multer');
const connectEnsureLogin = require('connect-ensure-login');
// Importing the User Model or Schema
const Registration = require('../models/User');
const UrbanFarmerUpload = require('../models/Urbanfarmerupload');


// Agricultural Officer Route
router.get('/fo-area', (req, res) => {
  res.render('dash-fo');
});

module.exports = router; 
