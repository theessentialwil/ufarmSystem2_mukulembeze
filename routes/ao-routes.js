const express= require('express');
const router = express.Router(); 
const multer = require('multer');
const connectEnsureLogin = require('connect-ensure-login');
// Importing the User Model or Schema
const Registration = require('../models/User');
const UrbanFarmerUpload = require('../models/Urbanfarmerupload');


// Agricultural Officer Dashboard Route                                                 Notice in effecting the login that the authentication routes file and this route work together and important is Line 13 that specifies the role as it is in the name attribute of the role field in the signup form
router.get('/ao-area', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {             // esures login to access agric officer area or dashboard
  req.session.user = req.user;
  if (req.user.role == 'Agricultural Officer') {
    try {
      // const order = {_id:-1}
      let leadFarmers = await Registration.find({role: "Farmer One"}).sort({$natural:-1});
      let appointees = await Registration.find({status: "Appointed"}).sort({$natural:-1});    //New for appointed FOs
      
      let totalDairy = await UrbanFarmerUpload.aggregate([
        { $match: { productcategory: "Diary" } },
        { $group: { _id: "$all", 
        totalQuantity: { $sum: "$stockbalance" },
        totalCost: { $sum: { $multiply: [ "$unitprice", "$stockbalance" ] } }, 
        }}
      ])

      let totalHort = await UrbanFarmerUpload.aggregate([
        { $match: { productcategory: "Horticulture" } },
        { $group: { _id: "$all", 
        totalQuantity: { $sum: "$stockbalance" },
        totalCost: { $sum: { $multiply: [ "$unitprice", "$stockbalance" ] } }, 
        }}
      ])

      let totalPoultry = await UrbanFarmerUpload.aggregate([
        { $match: { productcategory: "Poultry" } },
        { $group: { _id: "$productname", 
        totalQuantity: { $sum: "$stockbalance" },
        totalCost: { $sum: { $multiply: [ "$unitprice", "$stockbalance" ] } }, 
        }}
      ])

      console.log("Poultry collections", totalPoultry)
      console.log("Hort collections", totalHort)
      console.log("Dairy collections", totalDairy)

      // let totalDairyByWard = await UrbanFarmerUpload.aggregate([
      //   { $match: { productcategory: "Diary", ward: "Masajja-1" } },
      //   { $group: { _id: "$all", 
      //   totalQuantity: { $sum: "$stockbalance" },
      //   totalCost: { $sum: { $multiply: [ "$unitprice", "$stockbalance" ] } }, 
      //   }}
      // ])

      res.render('dash-ao', {
      farmerOnes:leadFarmers, 
      seniors:appointees, 
      totalP:totalPoultry[0], 
      totalH:totalHort[0], 
      totalD:totalDairy[0],
      // totalWardD:totalDairyByWard[0]
    });
    } catch (error) {
      res.status(400).send("Sorry there seems to be no Farmer Ones matching your request");
      console.log(error);
    }
  } else {
    res.send('This page is only accessible by Agricultural Officer');
  }
});

// Getting List of Incumbent Farmer Ones from Database; The sort is to get the most currently added show up at the top.
// router.get('/fo-now-list', async (req,res) => {
//   try {
//     // const order = {_id:-1}
//     let leadFarmers = await Registration.find({role: "Farmer One"}).sort({$natural:-1});
//     res.render('farmer-ones-now-list', {farmerOnes:leadFarmers});
//   } catch (error) {
//     res.status(400).send("Sorry there seems to be no Farmer Ones matching your request");
//     console.log(error);
//   }
// });

// Update Farmer One Details Route
router.get('/farmerone/update/:id', async (req,res) => {
  try {
    const updateFOne = await Registration.findOne({_id:req.params.id})
    res.render('fo-update', {farmerOne:updateFOne});
    console.log('Updated Farmer One', updateFOne);
  } catch (error) {
    res.status(400).send("Sorry we seem unable to update this Farmer One's record");
  }
});

router.post('/farmerone/update', async (req,res) => {
  try {
    await Registration.findOneAndUpdate({_id:req.query.id}, req.body);
    res.redirect('/ao-area');
  } catch (error) {
    res.status(400).send("Sorry we seem unable to update this Farmer One's record");
  }
});


module.exports = router; 
