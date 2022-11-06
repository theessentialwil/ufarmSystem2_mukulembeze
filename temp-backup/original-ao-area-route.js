// Agricultural Officer Dashboard Route                                                 Notice in effecting the login that the authentication routes file and this route work together and important is Line 13 that specifies the role as it is in the name attribute of the role field in the signup form
router.get('/ao-area', connectEnsureLogin.ensureLoggedIn(), (req, res) => {             // esures login to access agric officer area or dashboard
  req.session.user = req.user;
  if (req.user.role == 'Agricultural Officer') {
    res.render('dash-ao');
  } else {
    res.send('This page is only accessible by Agricultural Officer');
  }
});

// Getting List of Incumbent Farmer Ones from Database; The sort is to get the most currently added show up at the top.
router.get('/fo-now-list', async (req,res) => {
  try {
    // const order = {_id:-1}
    let leadFarmers = await Registration.find({role: "Farmer One"}).sort({$natural:-1});
    res.render('farmer-ones-now-list', {farmerOnes:leadFarmers});
  } catch (error) {
    res.status(400).send("Sorry there seems to be no Farmer Ones matching your request");
    console.log(error);
  }
});


// The above two routes were combined into the one below:
// The pug file farmer-ones-now-list was renamed to dash-ao below

router.get('/ao-area', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {             // esures login to access agric officer area or dashboard
  req.session.user = req.user;
  if (req.user.role == 'Agricultural Officer') {
    try {
      // const order = {_id:-1}
      let leadFarmers = await Registration.find({role: "Farmer One"}).sort({$natural:-1});
      res.render('dash-ao', {farmerOnes:leadFarmers});
    } catch (error) {
      res.status(400).send("Sorry there seems to be no Farmer Ones matching your request");
      console.log(error);
    }
  } else {
    res.send('This page is only accessible by Agricultural Officer');
  }
});