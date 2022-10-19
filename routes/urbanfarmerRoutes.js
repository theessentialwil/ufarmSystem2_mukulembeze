const express= require('express');
const router = express.Router(); 
const multer = require('multer');
const connectEnsureLogin = require('connect-ensure-login');
// Importing the User Model or Schema
const UrbanFarmerUpload = require('../models/Urbanfarmerupload');
const Registration = require('../models/User');
// see comments.txt



// image upload
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
  cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
  cb(null, file.originalname);
  }
  });
  
  // instantiate variable upload to store multer functionality to upload image
  var upload = multer({ storage: storage }) 

// Upload Product/Produce route
// router.get("/ufarmerupload", async (req, res) => {
//   let urbanFarmerList = await Registration.find({role: 'urbanfarmer'});
//   res.render('ufupload', {urbanfarmers:urbanFarmerList});
// });

router.get("/ufarmerupload", connectEnsureLogin.ensureLoggedIn(), upload.single('productimage'), async (req, res) => {
  
  res.render('ufupload', {currentUser: req.session.user});
});

router.post("/ufarmerupload", connectEnsureLogin.ensureLoggedIn(), upload.single('productimage'), async (req, res) => {
  console.log(req.body);
  try {
    const product = new UrbanFarmerUpload(req.body);
    product.productimage = req.file.path;
    await product.save();
      res.redirect('/index');
    }
    catch (error) {
      res.status(400).send("Sorry pal product not saved.");
      console.log(error);
  }
});

// Urban Farmer Login route
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {

});

// Urban Farmer Member Area route
router.get('/urbfarmermember', (req, res) => {
  res.render('urbfarmermemberarea');
});



module.exports = router; 
