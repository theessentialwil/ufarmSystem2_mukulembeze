const Validate = () => {
  var role = document.getElementById('role');
  var uniqueNum = document.getElementById('uniquenum');
  var supplierName = document.getElementById('supplierbizname');
  var userId = document.getElementById('fouserid');
  var ward = document.getElementById('fo-ward');
  var firstName = document.getElementById('for-fname');
  var lastName = document.getElementById('fo-lname');
  var nin = document.getElementById('nin');
  var phoneNum = document.getElementById('phoneno');
  var email = document.getElementById('email');
  var passWord = document.getElementById('password');
  var activities = document.getElementById('activities');
  var duration = document.getElementById('duration');
  var residencetype = document.getElementById('residencetype');

  var roleError = document.getElementById('roleerr');
  var uniqueNumError = document.getElementById('uniquenumerr');
  var supplierNameError = document.getElementById('suppliernameerr');
  var userIdError = document.getElementById('useriderr');
  var wardError = document.getElementById('warderr');
  var firstNameError = document.getElementById('firstnameerr');
  var lastNameError = document.getElementById('lastnameerr');
  var ninError = document.getElementById('ninerr');
  var emailError = document.getElementById('emailerr');
  var phoneNumError = document.getElementById('phonenoerr');
  var passWordError = document.getElementById('passworderr');
  var activitiesError = document.getElementById('activitieserr');
  var durationError = document.getElementById('durationerr');
  var residencetypeError = document.getElementById('residencetypeerr');

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

  // const unregex = /^UF-B9006-[a-zA-Z]+\d\d$/;
  
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

  //  Validation for Supplier Business Name
  if (supplierName.value == "") {
    supplierName.style.border = '1px solid red';
    supplierNameError.textContent = 'Please specify Supplier Name';
    supplierNameError.style = 'color: red; font-size: 12px; font-family: Arial, Helvetica, Sans-serif;';
    return false
  } else if (supplierName.value == 'notspecified')  {
    supplierName.style.border = '1px solid red';
    supplierNameError.textContent = 'Please specify Supplier Name';
    supplierNameError.style = 'color: red; font-size: 12px; font-family: Arial, Helvetica, Sans-serif;';
    return false
  } else {
    supplierName.style.border = '1px solid green';
    supplierNameError.textContent = "";
  }

//  Validation for ward
if (ward.value == "") {
  ward.style.border = '1px solid red';
  wardError.textContent = 'Please specify ward';
  wardError.style = 'color: red; font-size: 12px; font-family: Arial, Helvetica, Sans-serif;';
  return false
} else {
  ward.style.border = '1px solid green';
  wardError.textContent = "";
}

//  Validation for nin
if (nin.value == "") {
  nin.style.border = '1px solid red';
  ninError.textContent = 'Please specify NIN';
  ninError.style = 'color: red; font-size: 12px; font-family: Arial, Helvetica, Sans-serif;';
  return false
} else {
  nin.style.border = '1px solid green';
  ninError.textContent = "";
}

//  Validation for First Name
if (firstName.value == "") {
  firstName.style.border = '1px solid red';
  firstNameError.textContent = 'Please enter your First Name';
  firstNameError.style = 'color: red; font-size: 12px; font-family: Arial, Helvetica, Sans-serif;';
  return false
} else {
  firstName.style.border = '1px solid green';
  firstNameError.textContent = "";
}

//  Validation for Last Name
if (lastName.value == "") {
  lastName.style.border = '1px solid red';
  lastNameError.textContent = 'Please enter your Last Name';
  lastNameError.style = 'color: red; font-size: 12px; font-family: Arial, Helvetica, Sans-serif;';
  return false
} else {
  lastName.style.border = '1px solid green';
  lastNameError.textContent = "";
}

//  Validation for Phone Number
if (phoneNum.value == "") {
  phoneNum.style.border = '1px solid red';
  phoneNumError.textContent = 'Please provide contact number';
  phoneNumError.style = 'color: red; font-size: 12px; font-family: Arial, Helvetica, Sans-serif;';
  return false
} else {
  phoneNum.style.border = '1px solid green';
  phoneNumError.textContent = "";
}

//  Validation for Email
if (email.value == "") {
  email.style.border = '1px solid red';
  emailError.textContent = 'Please enter email address';
  emailError.style = 'color: red; font-size: 12px; font-family: Arial, Helvetica, Sans-serif;';
  return false
} else {
  email.style.border = '1px solid green';
  emailError.textContent = "";
}

  // validation for password
  if (passWord.value == "") {
    passWord.style.border = '1px solid red';
    passWordError.textContent = 'Please specify passWord';
    passWordError.style = 'color: red; font-size: 12px; font-family: Arial, Helvetica, Sans-serif;';
    return false
  } else if (passWord.value.length < 5)  {
    passWord.style.border = '1px solid red';
    passWordError.textContent = 'Please create password of 5-15 characters';
    passWordError.style = 'color: red; font-size: 12px; font-family: Arial, Helvetica, Sans-serif;';
    return false
  } else if (passWord.value.length > 15)  {
    passWord.style.border = '1px solid red';
    passWordError.textContent = 'Password must not be more than 15 characters';
    passWordError.style = 'color: red; font-size: 12px; font-family: Arial, Helvetica, Sans-serif;';
    return false
  } else {
    passWord.style.border = '1px solid green';
    passWordError.textContent = "";
  }

  //  Validation for activities
if (activities.value == "") {
  activities.style.border = '1px solid red';
  activitiesError.textContent = 'Please specify activity';
  activitiesError.style = 'color: red; font-size: 12px; font-family: Arial, Helvetica, Sans-serif;';
  return false
} else {
  activities.style.border = '1px solid green';
  activitiesError.textContent = "";
}

// validation for Number of Years at residence
if (duration.value == "") {
  duration.style.border = '1px solid red';
  durationError.textContent = "Please specify no. of years";
  durationError.style = 'color: red; font-size: 12px; font-family: Arial, Helvetica, Sans-serif;';
  return false
} else if (duration.value < 11)  {
  duration.style.border = '1px solid red';
  durationError.textContent = 'Sorry you are not yet eligible.';
  durationError.style = 'color: red; font-size: 12px; font-family: Arial, Helvetica, Sans-serif;';
  return false
} else {
  duration.style.border = '1px solid green';
  durationError.textContent = "";
}

//  Validation for residence type
if (residencetype.value == "") {
  residencetype.style.border = '1px solid red';
  residencetypeError.textContent = 'Please specify residence type';
  residencetypeError.style = 'color: red; font-size: 12px; font-family: Arial, Helvetica, Sans-serif;';
  return false
} else {
  residencetype.style.border = '1px solid green';
  residencetypeError.textContent = "";
}










}