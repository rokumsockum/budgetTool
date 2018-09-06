/********************
Get inner HTML of warning message elements
*********************/
let taxWarning = document.getElementById("taxWarning");

/********************
get html elements of Totals fields
********************/
const expenses = document.getElementById("expenses");
const netIncome = document.getElementById("netIncome");
const spendingMoney = document.getElementById("spendingMoney");

/********************
Add expense elements
********************/
let counter = 1;

/****************************!!!!!
remove expense fields, this function is triggered by the HTML attribute onclick, which calls the function removeExpense(this.id).
****************************!!!!!!*/
const removeExpense = (id) => {
  let btnIndex = null;
  const numberID = parseInt(id.slice(6));//pass ONLY the number to numberID.  It is CRUCIALLY important that an integer is passed, or the findIndex() function will FAILL!
  
  //remove button from existing buttons Array by finding it with the byID function, which iterates over the array, passing element and comparing to id, then splicing it out.
btnIndex = btnArray.findIndex(byID = (element) => {
    return element === numberID;
  });

  btnArray.splice(btnIndex, 1);

  //Remove element itself
  document.getElementById(id).parentElement.remove();
}

//create array of buttons and intialize with null;
let btnArray = [];

//add expense felds
addExpense = () => {
  let form = document.getElementsByTagName("form")[0];//form gets the form element

  //div eklement
  let div = document.createElement("div");
  div.classList.add("form-group");
  div.setAttribute("id", "divExpense" + counter);

  //label element
  let label = document.createElement("label");
  label.setAttribute("for", "budget");
  let labelText = document.createTextNode("Custom Expense" + counter);
  label.appendChild(labelText);

  //create input element for user
  let input = document.createElement("input");
  input.setAttribute("type", "currency");
  input.classList.add("form-control");
  input.setAttribute("id", "expense" + counter)
  input.setAttribute("placeholder", "Custom Monthly Expense" + counter);

  //create small text below input
  let small = document.createElement("small");
  let smallText = document.createTextNode("Enter a non-negative number for the custom monthly expense" + counter);
  small.appendChild(smallText);

  //This displays error text, id is important.
  let p = document.createElement("p");
  p.setAttribute("id", "expense" + counter + "Warning");
  p.classList.add("warningText");

  //button to remove expense
  let button = document.createElement("button");
  button.classList.add("btn", "btn-danger");
  button.setAttribute("id", "button" + counter);
  button.setAttribute("type", "button");
  button.setAttribute("onclick", "removeExpense(this.id)")
  let buttonText = document.createTextNode("- Remove Expense " + counter);
  button.appendChild(buttonText);

  //Add nodes to document HTML.
  div.appendChild(label);
  div.appendChild(input);
  div.appendChild(small);
  div.appendChild(p);
  div.appendChild(button);
  form.insertBefore(div, document.getElementById("addCost"));

  //add button to array of existing buttons
  btnArray.push(counter);

  //increment counter for next function iteration
  counter++;
}

const addButton = document.getElementById("addCost").addEventListener("click", addExpense);//add event listener to +Add Expense button.


/********************
Get inputs from all fields
*********************/

const getIncome = () => {
  incomeWarning.innerHTML = "";//clear the error message uppon subsequent iterations of the function, during the same session.
  let income = parseInt(document.getElementById("grossIncome").value, 10);
  if (isNaN(income)) {
        incomeWarning.innerHTML = "Please enter a value for Gross Yearly Salary/Income";
  } else {
  return income;
  }
  income = null;
}

const getTax = () => {
  taxWarning.innerHTML = "";//clear the error message uppon subsequent iterations of the function, during the same session.

  let tax = parseInt(document.getElementById("taxRate").value, 10);//tax receives a base 10 integer value from the tax rate field.
  //data validation
  if (isNaN(tax)) {
      taxWarning.innerHTML = "Please enter a value for Tax Rate";
    } else if (tax >= 100){ //if entered tax is 100 or greater, display error message.
    taxWarning.innerHTML = "Please enter a number between 0 and 99 for tax percentage";
    netIncome.innerHTML = "Please enter a number between 0 and 99 for tax percentage";
  } else if(tax >= 50 && tax < 100) { //if tax is greater than or equal to 50%, but less than 100, display message then return the tax rate to calculation.
    taxWarning.innerHTML = "Wow, do you live in a socialist country run by Dan or something? The government is literally taking $"
                            + Math.round((((tax / 100) * getIncome())) / 12)
                            + " of your money every month!";
    return tax;//display clever message, then return tax anyway.
  } else if(tax < 0) {
    taxWarning.innerHTML = "Please enter a positive income tax rate";
  } else {
    return tax;//if tax rate is between 0 and 49, return the tax rate.
  }
  tax = null;//clear tax variable for reiteration of function.
}

const getHousing = () => {
  housingWarning.innerHTML = "";//clear the error message uppon subsequent iterations of the function, during the same session.
  let houseCost = parseInt(document.getElementById("housingCosts").value, 10);
  if (isNaN(houseCost)) {
        housingWarning.innerHTML = "Please enter a value for Monthly Housing Costs";
  } else {
  return houseCost;
  }
  houseCost = null;
}

const getFood = () => {
  foodWarning.innerHTML = "";//clear the error message uppon subsequent iterations of the function, during the same session.
  let foodCost = parseInt(document.getElementById("foodCosts").value, 10);
  if (isNaN(foodCost)) {
        foodWarning.innerHTML = "Please enter a value for Monthly food Costs";
  } else {
  return foodCost;
  }
  foodCost = null;
}

const getCar = () => {
  carWarning.innerHTML = "";//clear the error message uppon subsequent iterations of the function, during the same session.
  let carCost = parseInt(document.getElementById("carCosts").value, 10);
  if (isNaN(carCost)) {
        carWarning.innerHTML = "Please enter a value for Monthly food Costs";
  } else {
  return carCost;
  }
  carCost = null;
}

const getCustom = () => {
  carWarning.innerHTML = "";//clear the error message uppon subsequent iterations of the function, during the same session.
  let carCost = parseInt(document.getElementById("carCosts").value, 10);
  if (isNaN(carCost)) {
        carWarning.innerHTML = "Please enter a value for Monthly food Costs";
  } else {
  return carCost;
  }
  carCost = null;
}

/********************
Get custom elements
********************/
const getCustomSum = () => {
  let customExpenseSum = 0;
  btnArray.forEach((element) => {
    customExpenseSum += parseInt(document.getElementById("expense" + element).value, 10);
  })
  return customExpenseSum;
}

/********************
calculate net monthly income
********************/
const netMonthlyIncome = () => {
  return (getIncome() / 12) * ((100 - getTax()) / 100);
}

const monthlyExpenses = () => {
  let expense =  getHousing() + getFood() + getCar();
  return expense;
}

const mnthSpendMoney = () => {
  expenses.innerHTML = "$" + Math.round(monthlyExpenses() + getCustomSum());
  netIncome.innerHTML = "$" + Math.round(netMonthlyIncome());
  spendingMoney.innerHTML = "$" + Math.round(netMonthlyIncome() - monthlyExpenses());
}

/********************
get button and add event listener
********************/
const calc = document.getElementById("calc");
calc.addEventListener("click", mnthSpendMoney);
