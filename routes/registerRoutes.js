const express= require('express');
const router = express.Router(); 

// Importing the User Model or Schema
const Registration = require('../models/User');
// see comments.txt


// home page route
router.get('/index', (req,res) => {
  res.render('index');
});

// farmer one registration/signup form
router.get("/registerfo", (req, res) => {
  res.render('fo-sign-up');
});

router.post("/registerfo", async (req, res) => {
  console.log(req.body);
  try {
    const user = new Registration(req.body);
    await Registration.register(user, req.body.password, (error) => {
      if (error) {
        throw error
      }
      res.redirect('/index');
    });
  } catch (error) {
      res.status(400).send("Sorry we're updating system");
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
    let useridExists = await Registration.findOne({userid:req.body.userid})
    if (useridExists) {
      return res.status(400).send("user id already exists, would you like to login?");
    } else {
      await Registration.register(user, req.body.password, (error) => {
        if (error) {
          throw error
        }
        res.redirect('/index');
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
    await Registration.register(user, req.body.password, (error) => {
      if (error) {
        throw error
      }
      res.redirect('/index');
    });
  } catch (error) {
    res.status(400).send("Sorry we're updating system");
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