const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
supplierbizname: {
  type: mongoose.Schema.Types.String,
  ref: 'Registration'
},
email: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Registration'
},
// phoneno: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'Registration'
// },
ward: {
  type: String
},
productcode: {
  type: String,
},
productcategory: {
  type: String,
},
productname: {
  type: String,
},
availability:  {
  type: String
},
producttype: {
  type: String,
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
orderdate: {
  type: String
},
orderno: {
 type: String
},
quantity: {
  type: Number,
},
firstname: {
  type: String,
  trim: true
},
phonenum: {
  type: String,
  trim: true
},
invoicetotal: {
  type: String
  // default: 0
},
orderstatus: {
  type: String,
  default: "Pending",
  enum: ['Pending', 'Delivered']
}
// availability: {
//   type: String, 
//   default: "available",
//   enum: ["available", "booked", "N/A"] 
//   }
})

module.exports = mongoose.model('UrbanFarmerUpload', userSchema);