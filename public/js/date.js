// Date of Registration. This script assumes that the date of registration will be the current date and there automatically fills in the Date of Registration field when the page loads.

function getDate(){
    var todaydate = new Date();
    var day = todaydate.getDate();
    var month = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = day + "/" + month + "/" + year;
    document.getElementById("frmDate").value = datestring;
   } 
 getDate();