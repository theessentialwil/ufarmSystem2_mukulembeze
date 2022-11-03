const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
supplierbizname: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Registration'
},
email: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Registration',
  required: true
},
ward: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Registration',
  required: true
},
productcode: {
  type: String,
  required: true
},
productcategory: {
  type: String,
  required: true
},
productname: {
  type: String,
  required: true
},
availability:  {
  type: String
},
producttype: {
  type: String,
  required: true
},
stockbalance: {
  type: Number,
},
unitprice: {
  type: Number
},
productimage: {
  type: String
},
pytmode: {
  type: String
},
deliverymode: {
  type: String
},
uniquenum: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Registration',
},
status: {
  type: String,
  default: "Pending",
  enum: ['Pending', 'Approved']
},
// availability: {
//   type: String, 
//   default: "available",
//   enum: ["available", "booked", "N/A"] 
//   }
})

module.exports = mongoose.model('UrbanFarmerUpload', userSchema);