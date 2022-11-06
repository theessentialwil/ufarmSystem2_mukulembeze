const express= require('express');
const router = express.Router(); 
const multer = require('multer');
const connectEnsureLogin = require('connect-ensure-login');
// Importing the User Model or Schema
const Registration = require('../models/User');
const UrbanFarmerUpload = require('../models/Urbanfarmerupload');


// Farmer One Dashboard Route                                                               Notice in effecting the login that the authentication routes file and this route work together and important is Line 13 that specifies the role as it is in the name attribute of the role field in the signup form
// In case two people can access, use || (or) in the if statement if (req.user.role == 'farmerone' || req.user.role == 'agriculturofficer');
router.get('/fo-area', connectEnsureLogin.ensureLoggedIn(), (req, res) => {          // // esures login to access farmer one area or dashboard           
  req.session.user = req.user;
  if (req.user.role == 'Farmer One') {
    res.render('dash-fo');
  } else {
    res.send('This page is only accessible by Farmer One');
  }
});

// Getting List of Farmer Ones from Database; The sort on line 55 is to get the most currently added product show up at the top.
router.get('/fo-list', async (req,res) => {
  try {
    // const order = {_id:-1}
    let leadFarmers = await Registration.find({role: "Farmer One"}).sort({$natural:-1});
    res.render('farmer-one-list', {farmerOnes:leadFarmers});
  } catch (error) {
    res.status(400).send("Sorry there seems to be no Farmer Ones matching your request");
    console.log(error);
  }
});

// Farmer One Reports by Irene --------Start
router.get("/reports", connectEnsureLogin.ensureLoggedIn(), async(req, res) => {
  req.session.user = req.user;
  if(req.user.role == 'Agricultural Officer'){
  try {
  let totalPoultry = await UrbanFarmerUpload.aggregate([
  { $match: { productcategory: "Poultry" } },
  { $group: { _id: "$productname", 
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
  
  let totalDairy = await UrbanFarmerUpload.aggregate([
  { $match: { productcategory: "Diary" } },
  { $group: { _id: "$all", 
  totalQuantity: { $sum: "$stockbalance" },
  totalCost: { $sum: { $multiply: [ "$unitprice", "$stockbalance" ] } }, 
  }}
  ])
  
  console.log("Poultry collections", totalPoultry)
  console.log("Hort collections", totalHort)
  console.log("Dairy collections", totalDairy)
  
  res.render("reports", { 
  title: 'Reports', 
  totalP:totalPoultry[0],
  totalH:totalHort[0],
  totalD:totalDairy[0],
  });
  } catch (error) {
  res.status(400).send("unable to find items in the database");
  }
  
  }else {
  res.send("This page is only accessed by Agric Officers")
  }
  }); 
// Farmer One Reports by Irene --------end



module.exports = router; 
