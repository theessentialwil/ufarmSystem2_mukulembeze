const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
producttype: {
  type: String,
  required: true
},
productimage: {
  type: String
},
stockcount: {
  type: Number,
},
stockmeasure: {
  type: String,
},
unitprice: {
  type: Number
},
email: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Registration',
  required: true
},
uniquenum: {
  type: String,
  required: true
},
ward: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Registration',
  required: true
},
pytmode: {
  type: String
},
deliverymode: {
  type: String
},
status: {
  type: String,
  default: "Pending",
  enum: ['Pending', 'Approved']
},
availability: {
  type: String, 
  default: "available",
  enum: ["available", "booked", "N/A"] 
  }
})

module.exports = mongoose.model('UrbanFarmerUpload', userSchema);