// Getting List of All Products by Ward From Database; The sort is to get the most currently added product show up at the top.
router.get('/ward-productlist', connectEnsureLogin.ensureLoggedIn(), async (req,res) => {
  req.session.user = req.user;
  if (req.user.role == "Farmer One" && req.user.ward == "Masajja-1" && req.user.status == 'Appointed') {
  try {
    // const order = {_id:-1}
    let mineProducts = await UrbanFarmerUpload.find({ward: 'Masajja-1'}).sort({$natural:-1});

    res.render('dash-fo', {mineGoods:mineProducts});

  } 
  catch (error) {
    res.status(400).send("Sorry there are no products matching your request");
    console.log(error);
  }
}
});

// Temporary order route
router.get('/myorders', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render('orderfrm', { currentUser: req.session.user });
})

router.post("/myorders",  connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  console.log(req.body);
  try {
    const order = new ClientOrders(req.body);
    await order.save();
      res.redirect('/index2');
    }
    catch (error) {
      res.status(400).send("Sorry we were unable to successfully process your order");
      console.log(error);
  }
});