// DEPENDENCIES (Or Plugins--------***** section in Anatomy of an Express Server
const express = require("express");
const path = require('path');

// INSTANTIATIONS----------------****** section in Anatomy of an Express Server
const app = express();

// CONFIGURATIONS-------------------**** section in Anatomy of an Express Server
app.engine('pug', require('pug').__express); 
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); 

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); 
app.use('/public/uploads', express.static(__dirname + '/public/uploads')) 

// ROUTES---------------------------**** section in Anatomy of an Express Server
app.get("/homepage", (req, res) => {
  res.render("index.pug");
});

app.get("/signup", (req, res) => {
  res.render("fo-sign-up")
});

app.post("/signup", (req, res) => {
  console.log(req.body);
  res.redirect("/homepage");
});

app.get("*", (req, res) => {
  res.send("404! This is an invalid URL.");
}); 



// BOOTSTRAPPING SERVER--------------***section in Anatomy of an Express Server

app.listen(3000, () => console.log("listening on port 3000")); 