const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true
  },
  uniquenum: {
    type: String
  },
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
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
  DateOfReg: {
    type: String
  },
  // email is utilized as the userid
  userid: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  ward: {
    type: String
  },
  duration: {
    type: Number
  }, 
  dob: {
    type: Date
  },
  activities: {
    type: String
  },
  residencetype: {
    type: String
  },
  homedirections: {
    type: String
  }
})

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'userid'
})
module.exports = mongoose.model('Registration', userSchema);
