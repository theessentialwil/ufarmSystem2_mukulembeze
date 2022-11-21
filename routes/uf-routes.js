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

// Urban farmer dashboard                                                             Notice in effecting the login that the authentication routes file and this route work together and important is Line 13 that specifies the role as it is in the name attribute of the role field in the signup form
router.get('/uf-area', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {           // esures login to access urban farmer area or dashboard
  req.session.user = req.user;
  let currentUrbanFarmer = req.user.firstname + ' ' + req.user.lastname;
  let urbanFarmerBusinessName = req.user.supplierbizname;                               // Because biz name is stored as _id this line helps be able to retrieve it for use in the dash-uf.pug
  // let currentUfBizName = req.user.supplierbizname
  if (req.user.role == 'urbanfarmer') {
    try {
      let personalProductList = await UrbanFarmerUpload.find({email: req.user._id}).sort({$natural:-1});            // This fetches specific urban farmer products
    
    res.render('dash-uf', {
      urbanFarmerName:currentUrbanFarmer,
      ufProducts:personalProductList,
      farmerBizName:urbanFarmerBusinessName
    });

  }  catch (error) {
    res.status(400).send("Sorry! There seems to be no match to your request");
      console.log(error);
  }
  } else {
    res.send('Sorry we are unable to grant you access to this page at the moment. Please try again.');
  }
});

// Product Upload route
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

// Getting List of All Products (not approved) From Database; The sort is to get the most currently added product show up at the top.
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



// Update Product Route
router.get('/produce/update/:id', async (req,res) => {
  try {
    const updateProduct = await UrbanFarmerUpload.findOne({_id:req.params.id})
    res.render('update-product', {product:updateProduct});
    console.log('Updated Produce', updateProduct);
  } catch (error) {
    res.status(400).send('Sorry we seem unable to update the product');
  }
});

router.post('/produce/update', async (req,res) => {
  try {
    await UrbanFarmerUpload.findOneAndUpdate({_id:req.query.id}, req.body);
    res.redirect('/uf-area');
  } catch (error) {
    res.status(400).send('Sorry we were unable to update product');
  }
});


// Changing Availability Route
router.get('/produce/available/:id', async (req,res) => {
  try {
    const saleProduct = await UrbanFarmerUpload.findOne({_id:req.params.id})
    res.render('availability', {item:saleProduct});
    console.log('Product approved', saleProduct);
  } catch (error) {
    res.status(400).send('Sorry we seem unable to approve the product');
  }
});

router.post('/produce/available', async (req,res) => {
  try {
    await UrbanFarmerUpload.findOneAndUpdate({_id:req.query.id}, req.body);
    res.redirect('/productlist');
  } catch (error) {
    res.status(400).send('Sorry we were unable to update product');
  }
});


// Delete Product
router.post('/produce/delete', async (req,res) => {                   // the route path here is attached to the form action of the deletebe button in the productlist.pug file where items from where deleting items will be effected.
  try {
    await UrbanFarmerUpload.deleteOne({_id:req.body.id});             // await is normally on database operations so the key word await is normally followed by the name of the database collection where the operation is going to take place.
    res.redirect('back');
  } catch (error) {
    res.status(400).send('Sorry product could not be deleted');
  }
});

// client orders route
router.get('/produce/orders/:id', connectEnsureLogin.ensureLoggedIn(), async (req,res) => {
  try {
    const orderProduct = await UrbanFarmerUpload.findOne({_id:req.params.id})
    res.render('orderform', {product:orderProduct,
      currentUser: req.session.user
    });
    console.log('Ordered Produce', orderProduct);
  } catch (error) {
    res.status(400).send('Sorry we seem unable to get the Order form');
  }
});

router.post('/produce/orders', connectEnsureLogin.ensureLoggedIn(), async (req,res) => {
  try {
    const newOrder = new UrbanFarmerUpload(req.body);
    await newOrder.save();
    res.redirect('/orderConfirmation');
  } catch (error) {
    res.status(400).send('Sorry we were unable to process your order');
    console.log(error);
  }
});

// client orders confirmation route
router.get('/orderConfirmation', (req,res) => {
    res.render('orderconfirm')
    });



module.exports = router; 
