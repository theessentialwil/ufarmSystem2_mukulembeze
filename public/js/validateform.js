const Validate = () => {
  var role = document.getElementById('role');
  var uniqueNum = document.getElementById('uniquenum');
  var userId = document.getElementById('fouserid');
  var ward = document.getElementById('fo-ward');
  var firstName = document.getElementById('for-fname');
  var lastName = document.getElementById('fo-lname');
  var passWord = document.getElementById('password');

  var roleError = document.getElementById('roleerr');
  var uniqueNumError = document.getElementById('uniquenumerr');
  var userIdError = document.getElementById('useriderr');
  var wardError = document.getElementById('warderr');
  var firstNameError = document.getElementById('firstnameerr');
  var lastNameError = document.getElementById('lastnameerr');
  var passWordError = document.getElementById('passworderr');

//  Validation for role
  if (role.value == "") {
    role.style.border = '1px solid red';
    roleError.textContent = 'Please specify role';
    roleError.style = 'color: red; font-size: 12px; font-family: Arial, Helvetica, Sans-serif;';
    return false
  } else if (role.value == 'notspecified')  {
    role.style.border = '1px solid red';
    roleError.textContent = 'Please specify role';
    roleError.style = 'color: red; font-size: 12px; font-family: Arial, Helvetica, Sans-serif;';
    return false
  } else {
    role.style.border = '1px solid green';
    roleError.textContent = "";
  }

  const unregex = /^UF-B9006-[a-zA-Z]+\d\d$/;
  
  if (uniqueNum.value == "") {
    uniqueNum.style.border = '1px solid red';
    uniqueNumError.textContent = 'Please enter unique ID';
    uniqueNumError.style = 'color: red; font-size: 12px; font-family: Arial, Helvetica, Sans-serif;';
    return false
  // } else if (!unregex.test(uniqueNum))  {
  //   uniqueNum.style.border = '1px solid red';
  //   uniqueNumError.textContent = 'Unique ID should be 12 alphanumeric. The first 9 characters must be UF-B9006- and the last three should be a capital letter followed by two digits';
  //   uniqueNumError.style = 'color: red; font-size: 12px; font-family: Arial, Helvetica, Sans-serif;';
  //   return false
  } else {
    uniqueNum.style.border = '1px solid green';
    uniqueNumError.textContent = "";
  }

  if (passWord.value == "") {
    passWord.style.border = '1px solid red';
    passWordError.textContent = 'Please specify passWord';
    passWordError.style = 'color: red; font-size: 12px; font-family: Arial, Helvetica, Sans-serif;';
    return false
  } else if (passWord.value.length < 5)  {
    passWord.style.border = '1px solid red';
    passWordError.textContent = 'Please password must be atleast 5 characters';
    passWordError.style = 'color: red; font-size: 12px; font-family: Arial, Helvetica, Sans-serif;';
    return false
  } else if (passWord.value.length > 15)  {
    passWord.style.border = '1px solid red';
    passWordError.textContent = 'Please password must not be more than 15 characters';
    passWordError.style = 'color: red; font-size: 12px; font-family: Arial, Helvetica, Sans-serif;';
    return false
  } else {
    passWord.style.border = '1px solid green';
    passWordError.textContent = "";
  }










}