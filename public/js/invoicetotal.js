function myFunction() {
  var x = document.getElementById("unitprice").value;
  var q = document.getElementById("quantity").value;
  document.getElementById("invoicetotal").innerHTML = x * q;
}
myFunction();