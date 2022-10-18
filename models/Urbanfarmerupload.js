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
supplierid: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Registration',
  required: true
},
uniquenum: {
  type: String,
  required: true
},
ward: {
  type: String
},
pytmode: {
  type: String
},
deliverymode: {
  type: String
}
})

module.exports = mongoose.model('UrbanFarmerUpload', userSchema);