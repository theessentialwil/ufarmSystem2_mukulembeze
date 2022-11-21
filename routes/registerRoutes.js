const express= require('express');
const router = express.Router(); 
const connectEnsureLogin = require('connect-ensure-login');

// Importing the Model(s) or Schema(s)
const Registration = require('../models/User');
const UrbanFarmerUpload = require('../models/Urbanfarmerupload');

// see comments.txt


// Temporary Links Route - Tired of Looking Up routes
router.get('/links', (req,res) => {
  res.render('links');
});

// home page route
// router.get('/index', (req,res) => {
  // res.render('index2');
// });

// home page rout Returning Approved lists of Products by category in the different tabs
router.get('/index', async (req,res) => {
  try {
    let saleDairy = await UrbanFarmerUpload.find({productcategory: 'Diary'}).sort({$natural:-1});
    let saleHorticulture = await UrbanFarmerUpload.find({productcategory: 'Horticulture'}).sort({$natural:-1});
    let salePoultry = await UrbanFarmerUpload.find({productcategory: 'Poultry'}).sort({$natural:-1});

    res.render('index2', {
      dairyGoods:saleDairy,
      horticultureGoods:saleHorticulture,
      poultryGoods:salePoultry
      });

    // console.log()
  } catch (error) {
    res.status(400).send("Sorry we are fresh out of dairy products right now.");
    console.log(error);
  }
});

// farmer one registration/signup form
router.get("/registerfo", (req, res) => {
  res.render('fo-sign-up');
});

router.post("/registerfo", async (req, res) => {
  console.log(req.body);
  try {
    const user = new Registration(req.body);
    let useridExists = await Registration.findOne({uniquenum:req.body.uniquenum})
    if (useridExists) {
      return res.status(400).send("Sorry that unique ID already exists, would you like to login?");
    } else {
      await Registration.register(user, req.body.password, (error) => {
        if (error) {
          throw error
        }
        res.redirect('/login');
      });
    }
  } catch (error) {
    res.status(400).send("Sorry something's not adding up.");
    console.log(error);
  }
});

// Agricultural Officer registration/signup form
router.get("/registerao", (req, res) => {
  res.render('ao-sign-up');
});

router.post("/registerao", async (req, res) => {
  console.log(req.body);
  try {
    const user = new Registration(req.body);
    let useridExists = await Registration.findOne({uniquenum:req.body.uniquenum})
    if (useridExists) {
      return res.status(400).send("Sorry that unique ID already exists, would you like to login?");
    } else {
      await Registration.register(user, req.body.password, (error) => {
        if (error) {
          throw error
        }
        res.redirect('/login');
      });
    }
  } catch (error) {
    res.status(400).send("Sorry something's not adding up.");
    console.log(error);
  }
});

// Urban farmer registration/signup form
router.get("/ufregister", (req, res) => {
  res.render('uf-sign-up');
});

router.post("/ufregister", async (req, res) => {
  console.log(req.body);
  try {
    const user = new Registration(req.body);
    let useridExists = await Registration.findOne({uniquenum:req.body.uniquenum})
    if (useridExists) {
      return res.status(400).send("Sorry that unique ID already exists, would you like to login?");
    } else {
      await Registration.register(user, req.body.password, (error) => {
        if (error) {
          throw error
        }
        res.redirect('/login');
      });
    }
  } catch (error) {
    res.status(400).send("Sorry something's not adding up.");
    console.log(error);
  }
});

// Customer registration/signup form
router.get("/registerclient", (req, res) => {
  res.render('client-signup');
});

router.post("/registerclient", async (req, res) => {
  console.log(req.body);
  try {
    const user = new Registration(req.body);
    let useridExists = await Registration.findOne({uniquenum:req.body.uniquenum})
    if (useridExists) {
      return res.status(400).send("Sorry the Username and/or email already exist, would you like to login?");
    } else {
      await Registration.register(user, req.body.password, (error) => {
        if (error) {
          throw error
        }
        res.redirect('/login');
      });
    }
  } catch (error) {
    res.status(400).send("Sorry something's not adding up. We are unable to sign you up. Please try again or call 0773468905");
    console.log(error);
  }
});

// Getting particular list. This is not a normal get route coz it has to fetch data so it must enable us to communicate with the db
router.get('/farmerOnesList', async (req,res) => {
  try {
    let items = await Registration.find({role: 'farmerone'});
    res.render('farmer-one-list', {farmerones:items});
  } catch (error) {
    res.status(400).send("Sorry there are no farmerones in the database");
    console.log(error);
  }
});

module.exports = router; 