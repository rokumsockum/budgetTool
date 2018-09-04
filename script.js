
//Get inputs from all fields
const getIncome = () => document.getElementById("grossIncome").value;

const getTax = () => document.getElementById("taxRate").value;

const getHousing = () => {
  let houseCost = parseInt(document.getElementById("housingCosts").value, 10);
  return houseCost;
}

const getFood = () => {
  let foodCost = parseInt(document.getElementById("foodCosts").value, 10);
  return foodCost;
}

const getCar = () => {
  let carCost = parseInt(document.getElementById("carCosts").value, 10);
  return carCost;
}

//get inner html of calculate fields
const expenses = document.getElementById("expenses");
const netIncome = document.getElementById("netIncome");
const spendingMoney = document.getElementById("spendingMoney");

//calculate net monthly income
const netMonthlyIncome = () => {
  return (getIncome() / 12) * (1 - getTax());
}

const monthlyExpenses = () => {
  let expense =  getHousing() + getFood() + getCar();
  return expense;
}

const mnthSpendMoney = () => {
  expenses.innerHTML = "$" + Math.round(monthlyExpenses());
  netIncome.innerHTML = "$" + Math.round(netMonthlyIncome());
  spendingMoney.innerHTML = "$" + Math.round(netMonthlyIncome() - monthlyExpenses());
}

//get button and add event listener
const calc = document.getElementById("calc");
calc.addEventListener("click", mnthSpendMoney);
