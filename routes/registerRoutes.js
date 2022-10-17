const express= require('express');
const router = express.Router(); 

// Importing Model
const Registration = require('../models/User');
// see comments.txt

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

module.exports = router; 