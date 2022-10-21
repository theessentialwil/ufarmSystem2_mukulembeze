const express= require('express');
const router = express.Router(); 
const multer = require('multer');
const connectEnsureLogin = require('connect-ensure-login');
// Importing the User Model or Schema
const UrbanFarmerUpload = require('../models/Urbanfarmerupload');
const Registration = require('../models/User');
const { get } = require('mongoose');
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

router.get("/ufarmerupload", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  console.log("This is the Current User ", req.session.user);
  res.render("ufupload", { currentUser: req.session.user });
});
  
router.post("/ufarmerupload", connectEnsureLogin.ensureLoggedIn(), upload.single('productimage'), async (req, res) => {
  console.log(req.body);
  try {
    const product = new UrbanFarmerUpload(req.body);
    product.productimage = req.file.path;
    await product.save();
      res.redirect('/ufarmerupload');
    }
    catch (error) {
      res.status(400).send("Sorry we were unable to save the product.");
      console.log(error);
  }
});

// Getting List of Produce From Database; The sort on line 55 is to get the most currently added product show up at the top.
router.get('/productlist', async (req,res) => {
  try {
    // const order = {_id:-1}
    let products = await UrbanFarmerUpload.find().sort({$natural:-1});
    res.render('productlist', {myproducts:products});
  } catch (error) {
    res.status(400).send("Sorry there are no products matching your request");
    console.log(error);
  }
});

// Update get and post Route
router.get('/produce/update/:id', async (req,res) => {
  try {
    const updateProduct = await UrbanFarmerUpload.findOne({_id:req.params.id})
    res.render('updateproduct', {product:updateProduct});
  } catch (error) {
    res.status(400).send('Sorry we seem unable to update the product');
  }
});

router.post('/produce/update', async (req,res) => {
  try {
    await UrbanFarmerUpload.findOneAndUpdate({_id:req.query.id}, req.body);
    res.redirect('/productlist');
  } catch (error) {
    res.status(400).send('Sorry we were unable to update product');
  }
});

// Urban farmer dashboard route
router.get('/uf-area', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  req.session.user = req.user;
  if (req.user.role == 'agriculturaofficer') {
    res.render('dash-uf');
  } else {
    res.send('This page is only accessible by Urban farmer');
  }
});


// Delete Product
router.post('/produce/delete', async (req,res) => {
  try {
    await UrbanFarmerUpload.deleteOne({_id:req.body.id});
    res.redirect('back');
  } catch (error) {
    res.status(400).send('Sorry product could not be deleted');
  }
});


module.exports = router; 
