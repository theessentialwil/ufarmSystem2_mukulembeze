const userId = document.uf - sign - up.userid;
const ward = document.uf - sign - up.ward;
const timeInWard = document.uf - sign - up.duration;
const firstName = document.uf - sign - up.firstname;
const lastName = document.uf - sign - up.lastname;
const dob = document.uf - sign - up.dob;
const niNo = document.uf - sign - up.nin;
const telPhone = document.uf - sign - up.phoneno;
const activity = document.uf - sign - up.activities;
const homeType = document.uf - sign - up.residencetype;
const homeDirect = document.uf - sign - up.homedirections;
const regDate = document.uf - sign - up.DateOfReg;
const passWord = document.uf - sign - up.password;

const checkFilled = () => {
	if (userId.value === "") {
		userId.style.border = "1px solid red";
		alert("Create a UserID");
		userId.focus();
		return false;
	} else {
		userId.style.border = "2px solid green";
	}
};

const checkWard = () => {
	if (ward.value) {
		ward.style.border = "2px solid green";
	} else {
		ward.style.border = "1px solid red";
		alert("Would you please specify ward");
	}
};

const checkTimeInWard = () => {
	if (timeInWard.value < 11) {
		timeInWard.style.border = "1px solid red";
		alert("You need to have lived in ward for more than 10years.");
	} else {
		timeInWard.style.border = "2px solid green";
	}
};

const checkfirstName = () => {
	if (firstName.value == "") {
		firstName.style.border = "1px solid red";
		alert("Please enter your surname.");
		// firstName.focus();
		// return false;
	} else {
		firstName.style.border = "2px solid green";
	}
};

const checklastName = () => {
	if (lastName.value == "") {
		lastName.style.border = "1px solid red";
		alert("Please enter your surname.");
		// lastName.focus();
		// return false;
	} else {
		lastName.style.border = "2px solid green";
	}
};

const checkDate = () => {
	if (dob.value == "") {
		dob.style.border = "1px solid red";
		alert("Please specify Date of Birth");
		// dob.focus();
		// return false;
	} else {
		dob.style.border = "2px solid green";
	}
};

const checkNin = () => {
	let ninLength = niNo.value;
	if (niNo.value == "" || ninLength.length < 14 || ninLength.length > 14) {
		niNo.style.border = "1px solid red";
		alert("Would you please enter correct National Identification Number.");
		// niNo.focus();
		// return false;
	} else {
		niNo.style.border = "2px solid green";
	}
};

const checkPhone = () => {
	let telEntry = /^\d{10}$/;
	// all must be digits but must be 10

	if (telPhone.value.match(telEntry)) {
		telPhone.style.border = "2px solid green";
	} else {
		telPhone.style.border = "1px solid red";
		alert("Enter 10-digit phone number.");
	}
};

// Activities here needs changing to check box options in case one is involved in more than one activity. Also checkActivity validation below for html select element switches things up and starts with the green section then the red section. Could this switch up work for validating other form elements.

const checkActivity = () => {
	if (activity.value) {
		activity.style.border = "2px solid green";
	} else {
		activity.style.border = "1px solid red";
		alert("Would you please specify activities");
	}
};

const checkHomeType = () => {
	if (homeType.value) {
		homeType.style.border = "2px solid green";
	} else {
		homeType.style.border = "1px solid red";
		alert("Would you please specify activities");
	}
};

const checkDirections = () => {
	if (homeDirect.value == "") {
		homeDirect.style.border = "1px solid red";
		alert("Please type brief directions to your residence.");
		// homeDirect.focus();
		// return false;
	} else {
		homeDirect.style.border = "2px solid green";
	}
};

const turnRegDate = () => {
	regDate.style.border = "2px solid green";
};

const checkpassWord = () => {
	let passwdEntry = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; //Input Password and Submit [6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter]

	// if (passWord.value === "") {
	//     passWord.style.border = "2px solid green";
	// }
	if (passWord.value.match(passwdEntry)) {
		passWord.style.border = "2px solid green";
	} else {
		passWord.style.border = "2px solid red";
		alert(
			"Password must be between 6 & 20 character \n, contain at least one digit, one uppercase letter"
		);
		// passWord.focus();
	}
};

const formValidate = () => {
	checkFilled();
	checkWard();
	checkTimeInWard();
	checkfirstName();
	checklastName();
	checkDate();
	checkNin();
	checkPhone();
	checkActivity();
	checkHomeType();
	checkDirections();
	turnRegDate();
	checkpassWord();
}

// const button = document.getElementById('but');
// button.addEventListener('click', changeText);


