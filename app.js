// DEPENDENCIES (Or Plugins--------***** section in Anatomy of an Express Server
const express = require("express");
const path = require('path');
const mongoose =require('mongoose');
const config = require('./config/db');
const passport = require('passport');
//express sesssion
const expressSession = require('express-session')({
  secret: 'hermit#9',
  resave: false,
  saveUninitialized: false,
  }); 
// Import the User Model or Schema 
const Registration = require('./models/User');
const UrbanFarmerUpload = require('./models/Urbanfarmerupload')

// Importing Route files: see comments.txt
const registerRoutes = require('./routes/registerRoutes');
const urbanfarmerRoutes = require('./routes/urbanfarmerRoutes');
const authenticateRoutes = require('./routes/authenticationroutes');

// INSTANTIATIONS----------------****** section in Anatomy of an Express Server
const app = express();

// Setup Database Connections
mongoose.connect(config.database,{ useNewUrlParser: true });
const db = mongoose.connection;

// Check connection
db.once('open', function(){

console.log('Connected to MongoDB');
});
// Check for db errors
db.on('error', function(err){
console.error(err);
}); 

// CONFIGURATIONS-------------------**** section in Anatomy of an Express Server
app.engine('pug', require('pug').__express); 
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); 

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); 
app.use('/public/uploads', express.static(__dirname + '/public/uploads')) 
app.use(expressSession);

// Passport configuration middleware
app.use(passport.initialize());
app.use(passport.session()); 
passport.use(Registration.createStrategy());
passport.serializeUser(Registration.serializeUser());
passport.deserializeUser(Registration.deserializeUser());

// ROUTES---------------------------**** section in Anatomy of an Express Server
app.use('/', registerRoutes); 
app.use('/', urbanfarmerRoutes);
app.use('/', authenticateRoutes);


app.get("*", (req, res) => {
  res.send("404! This is an invalid URL.");
}); 


// BOOTSTRAPPING SERVER--------------***section in Anatomy of an Express Server

app.listen(3000, () => console.log("listening on port 3000")); 