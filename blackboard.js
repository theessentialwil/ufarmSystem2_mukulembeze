/*Pseudo:
totalPrice of phone = costOfPhone + (costOfPhone * taxRate) + costOfAccessory
purchasing phones is based on bank balance,
purchase of accessory is conditional on threshold balance*/
const taxRate = 0.1;
const costOfPhone = 299.99;
const bankBalance = prompt('What is your Bank Account Balance?');
const mentalSpendingThreshhold = 799.99;
const costOfAccessory = 25.00;


function totalPriceOfPhonePurchase() {
  let totalCost = costOfPhone + ( costOfPhone * taxRate );
    totalCost = totalCost.toFixed( 2 );
  return totalCost;
}

for (let i = 0; bankBalance > 0; i++  ) {
  if (bankBalance);
}