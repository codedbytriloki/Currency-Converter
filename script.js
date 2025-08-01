const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("formCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");

const currencyList = ['USD','INR','EUR','GBP','JPY','AUD'];

currencyList.forEach((curr) => {
  const option1 = document.createElement('option');
  const option2 = document.createElement('option');
  option1.value = option2.value = curr;
  option1.text = option2.text = curr;
  fromCurrency.appendChild(option1);
  toCurrency.appendChild(option2);
})
fromCurrency.value = "USD";
toCurrency.value = "INR";

const API_KEY = 'lfA2OhaDFNcWJBtUGF2gsDFqpfOJdShR'

function convertCurrency() {
  const amount = amountInput.value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if(amount == "" || isNaN(amount)){
    result.textContent = "Please enter a valid amount";
    return;
  }

  if(from === to){
    result.innerHTML = "Please select different currencies.";
    return;
  }

  // fetch(`https://financialmodelingprep.com/api/v4/forex-rate?from=${from}&to=${to}&apikey=${API_KEY}`)
  fetch(`https://www.freeforexapi.com/api/live?pairs=${from}${to}`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    const rate = data.rates[`${from}${to}`].rate;
    const converted = (amount * rate).toFixed(2);
    result.innerHTML = `${amount} ${from} = ${converted} ${to}`
  })
  .catch(err => {
    console.log(err);
    result.textContent = 'Error fetching exchange rate.';
})
}


