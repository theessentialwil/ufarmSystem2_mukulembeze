const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true
  },
  fosurname: {
    type: String,
    required: true,
    trim: true
  },
  folname: {
    type: String,
    required: true,
    trim: true
  },
  sex:{
    type: String,
    required: true
  },
  nin: {
    type: String,
    required: true,
    trim:true
  },
  phoneno: {
    type: String,
    required: true,
    trim: true
  },
  foDateReg: {
    type: Date,
  },
  userid: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  ward: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  }, 
  dob: {
    type: Date,
    required: true
  },
  activities: {
    type: String,
    required: true
  },
  residencetype: {
    type: String,
    required: true
  },
  homedirections: {
    type: String,
    required: true
  },
})

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'userid'
})
module.exports = mongoose.model('Registration', userSchema);
