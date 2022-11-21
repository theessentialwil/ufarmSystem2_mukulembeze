// Creating a Mongoose model comprises primarily of three parts: 1. Referencing or requiring Mongoose; 2. Defining the Schema; 3. Exporting the Model|| See: https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    // required: true
  },
  uniquenum: {
    type: String,
    required: true,
    unique: true
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
    // required: true
  },
  nin: {
    type: String,
    // required: true,
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
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
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
  },
  supplierbizname: {
    type: String
  },
  status: {
    type: String,
    default: "Pending",
    enum: ['Appointed', 'Pending', 'Former']
  }
})

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'uniquenum'
})
module.exports = mongoose.model('Registration', userSchema);
