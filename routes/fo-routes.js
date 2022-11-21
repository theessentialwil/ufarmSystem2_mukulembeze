const express= require('express');
const router = express.Router(); 
const multer = require('multer');
const connectEnsureLogin = require('connect-ensure-login');
// Importing the Model(s) or Schema(s)
const Registration = require('../models/User');
const UrbanFarmerUpload = require('../models/Urbanfarmerupload');

// Farmer One Dashboard Route                                                               Notice in effecting the login that the authentication routes file and this route work together and important is Line 13 that specifies the role as it is in the name attribute of the role field in the signup form
// In case two people can access, use || (or) in the if statement if (req.user.role == 'farmerone' || req.user.role == 'agriculturofficer');
router.get('/fo-area', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {          // // esures login to access farmer one area or dashboard           
  req.session.user = req.user;
  let specificWard = req.user.ward;
  let currentFarmerOne = req.user.firstname + ' ' + req.user.lastname;
  if (req.user.role == 'Farmer One' && req.user.ward == 'Masajja-1' && req.user.status == 'Appointed') {
    try {
      let masajjaOneUrbanFarmers = await Registration.find({role: "urbanfarmer", ward: "Masajja-1"}).sort({$natural:-1});   //This fetches ward-specific urban farmers
      let allPendingProducts = await UrbanFarmerUpload.find({ward: 'Masajja-1'}).sort({$natural:-1});                             // This fetches ward-specific product list
      let allApprovedProducts = await UrbanFarmerUpload.find({ward: 'Masajja-1', status:'Approved'}).sort({$natural:-1});                             // This fetches ward-specific approved product list


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


    res.render('dash-fo', {
      wardBoss:currentFarmerOne,
      wardSpec:specificWard,
      mineGoods:allPendingProducts,
      wardApprovedGoods:allApprovedProducts,
      masajjaOneUrbanFarmers: masajjaOneUrbanFarmers,
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
  } else if (req.user.role == 'Farmer One' && req.user.ward == 'Masajja-2' && req.user.status == 'Appointed') {
    try {
      let masajjaOneUrbanFarmers = await Registration.find({role: "urbanfarmer", ward: "Masajja-2"}).sort({$natural:-1});   // This fetches ward-specific urban farmers to display on  FO page
      let allPendingProducts = await UrbanFarmerUpload.find({ward: 'Masajja-2'}).sort({$natural:-1});                             // This fetches ward-specific products list
      let allApprovedProducts = await UrbanFarmerUpload.find({ward: 'Masajja-2', status:'Approved'}).sort({$natural:-1});                             // This fetches ward-specific approved product list

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


    res.render('dash-fo', {
      wardBoss:currentFarmerOne,
      wardSpec:specificWard,
      mineGoods:allPendingProducts,
      wardApprovedGoods:allApprovedProducts,
      masajjaOneUrbanFarmers: masajjaOneUrbanFarmers,
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
 } else if (req.user.role == 'Farmer One' && req.user.ward == 'Masajja-3' && req.user.status == 'Appointed') {
  try {
    let masajjaOneUrbanFarmers = await Registration.find({role: "urbanfarmer", ward: "Masajja-3"}).sort({$natural:-1});   // This fetches ward-specific urban farmers to display on  FO page
    let allPendingProducts = await UrbanFarmerUpload.find({ward: 'Masajja-3'}).sort({$natural:-1});                             // This fetches ward-specific products list
    let allApprovedProducts = await UrbanFarmerUpload.find({ward: 'Masajja-3', status:'Approved'}).sort({$natural:-1});                             // This fetches ward-specific approved product list

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


  res.render('dash-fo', {
    wardBoss:currentFarmerOne,
    wardSpec:specificWard,
    mineGoods:allPendingProducts,
    wardApprovedGoods:allApprovedProducts,
    masajjaOneUrbanFarmers: masajjaOneUrbanFarmers,
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
} else if (req.user.role == 'Farmer One' && req.user.ward == 'Masajja-4' && req.user.status == 'Appointed') {
  try {
    let masajjaOneUrbanFarmers = await Registration.find({role: "urbanfarmer", ward: "Masajja-4"}).sort({$natural:-1});   //This fetches ward-specific urban farmers
    let allPendingProducts = await UrbanFarmerUpload.find({ward: 'Masajja-4'}).sort({$natural:-1});                       //This is to fetch ward-specific products from the db
    let allApprovedProducts = await UrbanFarmerUpload.find({ward: 'Masajja-4', status:'Approved'}).sort({$natural:-1});                             // This fetches ward-specific approved product list

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


  res.render('dash-fo', {
    wardBoss:currentFarmerOne,
    wardSpec:specificWard,
    mineGoods:allPendingProducts,
    wardApprovedGoods:allApprovedProducts,
    masajjaOneUrbanFarmers: masajjaOneUrbanFarmers,
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
    res.send('Very sorry! We are finding trouble granting you access to this page at this time.');
  }
});

// Update Urban Farmer Details Route
router.get('/urbanfarmer/update/:id', async (req,res) => {
  try {
    const updateUbFarmer = await Registration.findOne({_id:req.params.id})
    res.render('uf-update', {urbanFarmer:updateUbFarmer});
    console.log('Updated Urban Farmer', updateUbFarmer);
  } catch (error) {
    res.status(400).send("Sorry we seem unable to update this Urban farmer's record");
  }
});

router.post('/urbanfarmer/update', async (req,res) => {
  try {
    await Registration.findOneAndUpdate({_id:req.query.id}, req.body);
    res.redirect('/fo-area');
  } catch (error) {
    res.status(400).send("Sorry we seem unable to update this Urban farmer's record");
  }
});

// Delete Urban Farmer
router.post('/urbanfarmer/delete', async (req,res) => {                   // the route path here is attached to the form action of the deletebe button in the productlist.pug file where items from where deleting items will be effected.
  try {
    await Registration.deleteOne({_id:req.body.id});             // await is normally on database operations so the key word await is normally followed by the name of the database collection where the operation is going to take place.
    res.redirect('/fo-area');
  } catch (error) {
    res.status(400).send('Sorry Urban farmer record could not be deleted');
  }
});

// Approve Product Route
router.get('/produce/approve/:id', async (req,res) => {
  try {
    const updateProduct = await UrbanFarmerUpload.findOne({_id:req.params.id})
    res.render('approve', {product:updateProduct});
    console.log('Product approved', updateProduct);
  } catch (error) {
    res.status(400).send('Sorry we seem unable to approve the product');
  }
});

router.post('/produce/approve', async (req,res) => {
  try {
    await UrbanFarmerUpload.findOneAndUpdate({_id:req.query.id}, req.body);
    res.redirect('/fo-area');
  } catch (error) {
    res.status(400).send('Sorry we were unable to update this product');
  }
});

// Return Approved list of Products
router.get('/seeapprovedlist', async (req,res) => {
  try {
    // const order = {_id:-1}
    let products = await UrbanFarmerUpload.find().sort({$natural:-1});
    res.render('listofapproved', {goods:products});
    console.log(products)
  } catch (error) {
    res.status(400).send("Sorry there are no products matching your request");
    console.log(error);
  }
});


module.exports = router; 
