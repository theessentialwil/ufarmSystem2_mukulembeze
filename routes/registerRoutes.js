const express= require('express');
const router = express.Router(); 

// Importing Model
const Registration = require('../models/User');
// see comments.txt

router.get("/register", (req, res) => {
  res.render('fo-sign-up');
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const user = new Registration(req.body);
    await Registration.register(user, req.body.password, (error) => {
      if (error) {
        throw error
      }
      res.redirect('/register');
    });
  } catch (error) {
      res.status(400).send("Sorry we're updating system");
      console.log(error);
  }
});

router.get("/regagricofficer", (req, res) => {
  res.render('ao-sign-up');
});

router.post("/regagricofficer", (req, res) => {
  console.log(req.body);
});

router.get("/receive", (req, res) => {
  res.render('registration');
});

router.post("/receive", (req, res) => {
  console.log(req.body);
});

module.exports = router; 