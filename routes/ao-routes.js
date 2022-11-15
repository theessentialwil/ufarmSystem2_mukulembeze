const express= require('express');
const router = express.Router(); 
const multer = require('multer');
const connectEnsureLogin = require('connect-ensure-login');
// Importing the Model(s) or Schema(s)
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

      // console.log("Poultry collections", totalPoultry)
      // console.log("Hort collections", totalHort)
      // console.log("Dairy collections", totalDairy)

          //  BELOW: Dairy Numbers by Ward.
      let totalDairyByWardM1 = await UrbanFarmerUpload.aggregate([
        { $match: {$and: [{productcategory: "Diary"}, {ward: "Masajja-1"}] } },
        { $group: { _id: "$all", 
        totalQuantity: { $sum: "$stockbalance" },
        totalCost: { $sum: { $multiply: [ "$unitprice", "$stockbalance" ] } }, 
        }}
      ])

      let totalDairyByWardM2 = await UrbanFarmerUpload.aggregate([
        { $match: {$and: [{productcategory: "Diary"}, {ward: "Masajja-2"}] } },
        { $group: { _id: "$all", 
        totalQuantity: { $sum: "$stockbalance" },
        totalCost: { $sum: { $multiply: [ "$unitprice", "$stockbalance" ] } }, 
        }}
      ])
      
      let totalDairyByWardM3 = await UrbanFarmerUpload.aggregate([
        { $match: {$and: [{productcategory: "Diary"}, {ward: "Masajja-3"}] } },
        { $group: { _id: "$all", 
        totalQuantity: { $sum: "$stockbalance" },
        totalCost: { $sum: { $multiply: [ "$unitprice", "$stockbalance" ] } }, 
        }}
      ])

      let totalDairyByWardM4 = await UrbanFarmerUpload.aggregate([
        { $match: {$and: [{productcategory: "Diary"}, {ward: "Masajja-4"}] } },
        { $group: { _id: "$all", 
        totalQuantity: { $sum: "$stockbalance" },
        totalCost: { $sum: { $multiply: [ "$unitprice", "$stockbalance" ] } }, 
        }}
      ])

      //  BELOW: Horticulture Numbers by Ward.

      let totalHortByWardM1 = await UrbanFarmerUpload.aggregate([
        { $match: {$and: [{productcategory: "Horticulture"}, {ward: "Masajja-1"}] } },
        { $group: { _id: "$all", 
        totalQuantity: { $sum: "$stockbalance" },
        totalCost: { $sum: { $multiply: [ "$unitprice", "$stockbalance" ] } }, 
        }}
      ])

      let totalHortByWardM2 = await UrbanFarmerUpload.aggregate([
        { $match: {$and: [{productcategory: "Horticulture"}, {ward: "Masajja-2"}] } },
        { $group: { _id: "$all", 
        totalQuantity: { $sum: "$stockbalance" },
        totalCost: { $sum: { $multiply: [ "$unitprice", "$stockbalance" ] } }, 
        }}
      ])
      
      let totalHortByWardM3 = await UrbanFarmerUpload.aggregate([
        { $match: {$and: [{productcategory: "Horticulture"}, {ward: "Masajja-3"}] } },
        { $group: { _id: "$all", 
        totalQuantity: { $sum: "$stockbalance" },
        totalCost: { $sum: { $multiply: [ "$unitprice", "$stockbalance" ] } }, 
        }}
      ])

      let totalHortByWardM4 = await UrbanFarmerUpload.aggregate([
        { $match: {$and: [{productcategory: "Horticulture"}, {ward: "Masajja-4"}] } },
        { $group: { _id: "$all", 
        totalQuantity: { $sum: "$stockbalance" },
        totalCost: { $sum: { $multiply: [ "$unitprice", "$stockbalance" ] } }, 
        }}
      ])

      //  BELOW: Poultry Numbers by Ward.
      let totalPoultryByWardM1 = await UrbanFarmerUpload.aggregate([
        { $match: {$and: [{productcategory: "Poultry"}, {ward: "Masajja-1"}] } },
        { $group: { _id: "$all", 
        totalQuantity: { $sum: "$stockbalance" },
        totalCost: { $sum: { $multiply: [ "$unitprice", "$stockbalance" ] } }, 
        }}
      ])

      let totalPoultryByWardM2 = await UrbanFarmerUpload.aggregate([
        { $match: {$and: [{productcategory: "Poultry"}, {ward: "Masajja-2"}] } },
        { $group: { _id: "$all", 
        totalQuantity: { $sum: "$stockbalance" },
        totalCost: { $sum: { $multiply: [ "$unitprice", "$stockbalance" ] } }, 
        }}
      ])
      
      let totalPoultryByWardM3 = await UrbanFarmerUpload.aggregate([
        { $match: {$and: [{productcategory: "Poultry"}, {ward: "Masajja-3"}] } },
        { $group: { _id: "$all", 
        totalQuantity: { $sum: "$stockbalance" },
        totalCost: { $sum: { $multiply: [ "$unitprice", "$stockbalance" ] } }, 
        }}
      ])

      let totalPoultryByWardM4 = await UrbanFarmerUpload.aggregate([
        { $match: {$and: [{productcategory: "Poultry"}, {ward: "Masajja-4"}] } },
        { $group: { _id: "$all", 
        totalQuantity: { $sum: "$stockbalance" },
        totalCost: { $sum: { $multiply: [ "$unitprice", "$stockbalance" ] } }, 
        }}
      ])


      res.render('dash-ao', {
      farmerOnes:leadFarmers, 
      seniors:appointees, 
      totalP:totalPoultry[0], 
      totalH:totalHort[0], 
      totalD:totalDairy[0],
      totalWardD1:totalDairyByWardM1[0],
      totalWardD2:totalDairyByWardM2[0],
      totalWardD3:totalDairyByWardM3[0],
      totalWardD4:totalDairyByWardM4[0],
      totalWardH1:totalHortByWardM1[0],
      totalWardH2:totalHortByWardM2[0],
      totalWardH3:totalHortByWardM3[0],
      totalWardH4:totalHortByWardM4[0],
      totalWardP1:totalPoultryByWardM1[0],
      totalWardP2:totalPoultryByWardM2[0],
      totalWardP3:totalPoultryByWardM3[0],
      totalWardP4:totalPoultryByWardM4[0]


    });
    } catch (error) {
      res.status(400).send("Sorry! There seems to be no match to your request");
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
// NB: the commented out route above was incorporated in the extended route up above it.

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
