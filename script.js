let myChart;

reInitializeChart();
calculateEMI(); 





//display tenure based on radiobutton
function displayTenure(){
  var getTanureType = document.querySelector('input[name="tenureType"]:checked').value;
  if(getTanureType === "months"){
  
const tenureMonthTicksElements = document.querySelectorAll(".tenureMonthTicks");

// Loop through each element in the NodeList and set the display property
tenureMonthTicksElements.forEach(function(element) {
    element.style.display = "flex";
});

 var tenureYearTicksElements =  document.querySelectorAll(".tenureYearticks");
 tenureYearTicksElements.forEach(function(element) {
  element.style.display = "none";
});


//display month input

 let tenureMonthInputs =  document.querySelectorAll(".tenureMonthInput");

 tenureMonthInputs.forEach(function(elemnet){
  elemnet.style.display = "block";
 })


 let  tenureYearInputs=  document.querySelectorAll(".tenureYearInput");
 
 tenureYearInputs.forEach(function(elemet){
elemet.style.display = "none";
 });
 

  

  }
  else{
    const tenureMonthTicksElements = document.querySelectorAll(".tenureMonthTicks");

    // Loop through each element in the NodeList and set the display property
    tenureMonthTicksElements.forEach(function(element) {
        element.style.display = "none";
    });
    
     var tenureYearTicksElements =  document.querySelectorAll(".tenureYearticks");
     tenureYearTicksElements.forEach(function(element) {
      element.style.display = "flex";
    });

   //diplay year input
   
 let tenureMonthInputs =  document.querySelectorAll(".tenureMonthInput");

 tenureMonthInputs.forEach(function(elemnet){
  elemnet.style.display = "none";
 })


 let  tenureYearInputs=  document.querySelectorAll(".tenureYearInput");
 
 tenureYearInputs.forEach(function(elemet){
elemet.style.display = "block";
 });
  }
}




//home loan 

function homeLoan(){
  document.querySelector('#mainTitle').innerHTML = "Home Loan";

  //loan ammount
  document.querySelector('#homeLoanAmmount').style.display = "block";
  document.querySelector('#businessLoanAmmount').style.display="none";
  document.querySelector('#personalLoanAmount').style.display="none";

//loan tenure
document.querySelector('#homeTenure').style.display = "block";
document.querySelector('#personalTenure').style.display = "none";
document.querySelector('#businessTenure').style.display = "none";

//loan intrest rate 
document.querySelector('#homeIntrestRate').style.display = "block";
document.querySelector('#BusinessIntrestRate').style.display = "none";
document.querySelector('#PersonalIntrestRate').style.display = "none";

}

//Persnal Loan
function personalLoan(){
  document.querySelector('#mainTitle').innerHTML = "Personal Loan";

  //loan ammount
  document.querySelector('#homeLoanAmmount').style.display = "none";
  document.querySelector('#businessLoanAmmount').style.display="none";
  document.querySelector('#personalLoanAmount').style.display="block";

  
//loan tenure
document.querySelector('#homeTenure').style.display = "none";
document.querySelector('#personalTenure').style.display = "block";
document.querySelector('#businessTenure').style.display = "none";

//loan intrest rate 
document.querySelector('#homeIntrestRate').style.display = "none";
document.querySelector('#BusinessIntrestRate').style.display = "none";
document.querySelector('#PersonalIntrestRate').style.display = "block";
}

//business Loan 
function businessLoan(){
  document.querySelector('#mainTitle').innerHTML = "Business Loan"
  
  //loan ammount
  document.querySelector('#homeLoanAmmount').style.display = "none";
  document.querySelector('#businessLoanAmmount').style.display="block";
  document.querySelector('#personalLoanAmount').style.display="none";
  
//loan tenure
document.querySelector('#homeTenure').style.display = "none";
document.querySelector('#personalTenure').style.display = "none";
document.querySelector('#businessTenure').style.display = "block";

//loan intrest rate 
document.querySelector('#homeIntrestRate').style.display = "none";
document.querySelector('#BusinessIntrestRate').style.display = "block";
document.querySelector('#PersonalIntrestRate').style.display = "none";
}



function calculateEMI() {

 
  var loanAmount = parseInt(document.getElementById('loanAmount').value);
  var tenure = parseInt(document.getElementById('tenure').value);
  var tenureType = document.querySelector('input[name="tenureType"]:checked').value;
  var interestRate = parseInt(document.getElementById('interestRate').value);

  if (tenureType === 'years') {
    tenure *= 12; 
  }

  var monthlyInterestRatio = (interestRate / 100) / 12;
  var emi = calculateMonthlyEMI(loanAmount, monthlyInterestRatio, tenure);

  // Display results with commas
  var data = Math.round(parseFloat(emi.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ''))).toLocaleString('en-IN');
  var data1 = Math.round(parseFloat(calculateTotalInterest(emi, tenure, loanAmount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ''))).toLocaleString('en-IN');
  var data2 = Math.round(parseFloat(calculateTotalPayableAmount(emi, tenure).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ''))).toLocaleString('en-IN');
  
  document.getElementById('emiResult').textContent = data;
  document.getElementById('interestResult').textContent = data1;
  document.getElementById('payableAmountResult').textContent = data2;
  



  if(emi != null){
    if (myChart) {
      myChart.destroy();
      reInitializeChart(); 
  }
  }
  // Display table 
  displayAmortizationSchedule(emi, loanAmount, monthlyInterestRatio, tenure);
}

function calculateMonthlyEMI(loanAmount, monthlyInterestRatio, tenure) {
  var top = Math.pow((1 + monthlyInterestRatio), tenure);
  var bottom = top - 1;
  return loanAmount * monthlyInterestRatio * (top / bottom);
}

function calculateTotalInterest(emi, tenure, loanAmount) {
  return (emi * tenure) - loanAmount;
}

function calculateTotalPayableAmount(emi, tenure) {
  return emi * tenure;
}

function calculateInterestPercentage(emi, tenure, loanAmount) {
  var totalInterest = calculateTotalInterest(emi, tenure, loanAmount);
  return (totalInterest / calculateTotalPayableAmount(emi, tenure)) * 100;
}

function displayAmortizationSchedule(emi, loanAmount, monthlyInterestRatio, tenure) {
  var outputTableBody = document.getElementById('outputTableBody');
  outputTableBody.innerHTML = '';

  var bb = loanAmount;

  for (var j = 1; j <= tenure; j++) {
    var int_dd = bb * monthlyInterestRatio;
    var pre_dd = emi - int_dd;
    var end_dd = bb - pre_dd;

    // Append row to the table
    var row = outputTableBody.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);

    cell1.textContent = j;
    cell2.textContent = Math.round(bb.toFixed(2));
    cell3.textContent =Math.round(emi.toFixed(2));
    cell4.textContent =Math.round(pre_dd.toFixed(2));
    cell5.textContent =Math.round(int_dd.toFixed(2));
    cell6.textContent =Math.round(end_dd.toFixed(2));

    bb = end_dd;
  }
}





//range  start ***********************************************



//range section 1 -----------------------------------
const loanAmount = document.querySelector("#loanAmount");


const sliderEl = document.querySelector("#range");
// Function to update range slider and background
function updateSlider(){
  const loanAmountValue = parseFloat(loanAmount.value);

  // Check if the loan amount is within the valid range
  if (loanAmountValue >= parseFloat(sliderEl.min) && loanAmountValue <= parseFloat(sliderEl.max)) {
    sliderEl.value = loanAmountValue;
    const progress = (loanAmountValue / sliderEl.max) * 100;
  }
}

// Event listener for input changes on loan amount field
loanAmount.addEventListener("input", updateSlider);

// Event listener for input changes on range slider
sliderEl.addEventListener("input", (event) => {
  loanAmount.value = event.target.value;
  const progress = (event.target.value / sliderEl.max) * 100;
});



const businessLoanValue = document.querySelector("#businessLoanRange");
// Function to update PersonalLoanRange slider and background
function updateSlider() {
  const loanAmountValue = parseFloat(loanAmount.value);

  // Check if the loan amount is within the valid PersonalLoanRange
  if (loanAmountValue >= parseFloat(businessLoanValue.min) && loanAmountValue <= parseFloat(businessLoanValue.max)) {
    businessLoanValue.value = loanAmountValue;
    const progress = (loanAmountValue / businessLoanValue.max) * 100;
  }
}

// Event listener for input changes on loan amount field
loanAmount.addEventListener("input", updateSlider);

// Event listener for input changes on PersonalLoanRange slider
businessLoanValue.addEventListener("input", (event) => {
  loanAmount.value = event.target.value;
  const progress = (event.target.value / businessLoanValue.max) * 100;
 
});


const personalLoanValue = document.querySelector("#personalLoanRange");
// Function to update PersonalLoanRange slider and background
function updateSlider() {
  const loanAmountValue = parseFloat(loanAmount.value);

  // Check if the loan amount is within the valid PersonalLoanRange
  if (loanAmountValue >= parseFloat(personalLoanValue.min) && loanAmountValue <= parseFloat(personalLoanValue.max)) {
    personalLoanValue.value = loanAmountValue;
    const progress = (loanAmountValue / personalLoanValue.max) * 100;
  }
}

// Event listener for input changes on loan amount field
loanAmount.addEventListener("input", updateSlider);

// Event listener for input changes on PersonalLoanRange slider
personalLoanValue.addEventListener("input", (event) => {
  loanAmount.value = event.target.value;
  const progress = (event.target.value / personalLoanValue.max) * 100;
 
});








//renge section 2--------------------------------------------------------------------
const tenure = document.querySelector("#tenure");

//home tenure
const sliderEl2 = document.querySelector("#range2");
// Function to update range slider and background
function updateSlider() {
  const tenureValue = parseFloat(tenure.value);

  // Check if the loan amount is within the valid range
  if (tenureValue >= parseFloat(sliderEl2.min) && tenureValue <= parseFloat(sliderEl2.max)) {
    sliderEl2.value = tenureValue;
    const progress = (tenureValue / sliderEl2.max) * 100;
  }
}

// Event listener for input changes on loan amount field
tenure.addEventListener("input", updateSlider);

// Event listener for input changes on range slider
sliderEl2.addEventListener("input", (event) => {
  tenure.value = event.target.value;
  const progress = (event.target.value / sliderEl2.max) * 100;
});

const sliderEl2_2 = document.querySelector("#range2_2");

function updateSlider() {
  const tenureValue = parseFloat(tenure.value);

  // Check if the loan amount is within the valid range
  if (tenureValue >= parseFloat(sliderEl2_2.min) && tenureValue <= parseFloat(sliderEl2_2.max)) {
    sliderEl2_2.value = tenureValue;
    const progress = (tenureValue / sliderEl2_2.max) * 100;
  }
}

// Event listener for input changes on loan amount field
tenure.addEventListener("input", updateSlider);

// Event listener for input changes on range slider
sliderEl2_2.addEventListener("input", (event) => {
  tenure.value = event.target.value;
  const progress = (event.target.value / sliderEl2_2.max) * 100;
  //sliderEl2_2.style.background = `linear-gradient(to right, #f50 ${progress}%, #ccc ${progress}%)`;
});


//personal tenure

const personalTenureYearValue = document.querySelector("#personalTenureYear");
// Function to update range slider and background
function updateSlider() {
  const tenureValue = parseFloat(tenure.value);

  // Check if the loan amount is within the valid range
  if (tenureValue >= parseFloat(personalTenureYearValue.min) && tenureValue <= parseFloat(personalTenureYearValue.max)) {
    personalTenureYearValue.value = tenureValue;
    const progress = (tenureValue / personalTenureYearValue.max) * 100;
  }
}

// Event listener for input changes on loan amount field
tenure.addEventListener("input", updateSlider);

// Event listener for input changes on range slider
personalTenureYearValue.addEventListener("input", (event) => {
  tenure.value = event.target.value;
  const progress = (event.target.value / personalTenureYearValue.max) * 100;
});

const personalTenureMonthValue = document.querySelector("#personalTenureMonth");

function updateSlider() {
  const tenureValue = parseFloat(tenure.value);

  // Check if the loan amount is within the valid range
  if (tenureValue >= parseFloat(personalTenureMonthValue.min) && tenureValue <= parseFloat(personalTenureMonthValue.max)) {
    personalTenureMonthValue.value = tenureValue;
    const progress = (tenureValue / personalTenureMonthValue.max) * 100;
  }
}

// Event listener for input changes on loan amount field
tenure.addEventListener("input", updateSlider);

// Event listener for input changes on range slider
personalTenureMonthValue.addEventListener("input", (event) => {
  tenure.value = event.target.value;
  const progress = (event.target.value / personalTenureMonthValue.max) * 100;
  //personalTenureMonthValue.style.background = `linear-gradient(to right, #f50 ${progress}%, #ccc ${progress}%)`;
});


//business  tenure

const businessTenureYearValue = document.querySelector("#businessTenureYear");
// Function to update range slider and background
function updateSlider() {
  const tenureValue = parseFloat(tenure.value);

  // Check if the loan amount is within the valid range
  if (tenureValue >= parseFloat(businessTenureYearValue.min) && tenureValue <= parseFloat(businessTenureYearValue.max)) {
    businessTenureYearValue.value = tenureValue;
    const progress = (tenureValue / businessTenureYearValue.max) * 100;
  }
}

// Event listener for input changes on loan amount field
tenure.addEventListener("input", updateSlider);

// Event listener for input changes on range slider
businessTenureYearValue.addEventListener("input", (event) => {
  tenure.value = event.target.value;
  const progress = (event.target.value / businessTenureYearValue.max) * 100;
});

const businessTenureMonthValue = document.querySelector("#businessTenureMonth");

function updateSlider() {
  const tenureValue = parseFloat(tenure.value);

  // Check if the loan amount is within the valid range
  if (tenureValue >= parseFloat(businessTenureMonthValue.min) && tenureValue <= parseFloat(businessTenureMonthValue.max)) {
    businessTenureMonthValue.value = tenureValue;
    const progress = (tenureValue / businessTenureMonthValue.max) * 100;
  }
}

// Event listener for input changes on loan amount field
tenure.addEventListener("input", updateSlider);

// Event listener for input changes on range slider
businessTenureMonthValue.addEventListener("input", (event) => {
  tenure.value = event.target.value;
  const progress = (event.target.value / businessTenureMonthValue.max) * 100;
  //businessTenureMonthValue.style.background = `linear-gradient(to right, #f50 ${progress}%, #ccc ${progress}%)`;
});


// range section  3
const interestRate = document.querySelector("#interestRate");

const sliderEl3 = document.querySelector("#range3");
// Function to update range slider and background
function updateSlider() {
  const interestRateValue = parseFloat(interestRate.value);

  // Check if the loan amount is within the valid range
  if (interestRateValue >= parseFloat(sliderEl3.min) && interestRateValue <= parseFloat(sliderEl3.max)) {
    sliderEl3.value = interestRateValue;
    const progress = (interestRateValue / sliderEl3.max) * 100;
   // sliderEl3.style.background = `linear-gradient(to right, #f50 ${progress}%, #ccc ${progress}%)`;
  }
}

// Event listener for input changes on loan amount field
interestRate.addEventListener("input", updateSlider);

// Event listener for input changes on range slider
sliderEl3.addEventListener("input", (event) => {
  interestRate.value = event.target.value;
  const progress = (event.target.value / sliderEl3.max) * 100;
  //sliderEl3.style.background = `linear-gradient(to right, #f50 ${progress}%, #ccc ${progress}%)`;
});

//business

const BusinessIntrestRateRangeValue = document.querySelector("#BusinessIntrestRateRange");
// Function to update range slider and background
function updateSlider() {
  const interestRateValue = parseFloat(interestRate.value);

  // Check if the loan amount is within the valid range
  
  if (interestRateValue >= parseFloat(BusinessIntrestRateRangeValue.min) && interestRateValue <= parseFloat(BusinessIntrestRateRangeValue.max)) {
    BusinessIntrestRateRangeValue.value = interestRateValue;
    const progress = (interestRateValue / BusinessIntrestRateRangeValue.max) * 100;
  }
}

// Event listener for input changes on loan amount field 
interestRate.addEventListener("input", updateSlider);

// Event listener for input changes on range slider
BusinessIntrestRateRangeValue.addEventListener("input", (event) => {
  interestRate.value = event.target.value;
  const progress = (event.target.value / BusinessIntrestRateRangeValue.max) * 100;
});

//personal
const PersonalIntrestRateRangeValue = document.querySelector("#PersonalIntrestRateRange");
// Function to update range slider and background
function updateSlider() {
  const interestRateValue = parseFloat(interestRate.value);

  // Check if the loan amount is within the valid range
  if (interestRateValue >= parseFloat(PersonalIntrestRateRangeValue.min) && interestRateValue <= parseFloat(PersonalIntrestRateRangeValue.max)) {
    PersonalIntrestRateRangeValue.value = interestRateValue;
    const progress = (interestRateValue / PersonalIntrestRateRangeValue.max) * 100;
  }
}

// Event listener for input changes on loan amount field
interestRate.addEventListener("input", updateSlider);

// Event listener for input changes on range slider
PersonalIntrestRateRangeValue.addEventListener("input", (event) => {
  interestRate.value = event.target.value;
  const progress = (event.target.value / PersonalIntrestRateRangeValue.max) * 100;
});






//chart js **********************************************

 function reInitializeChart()
 {

  var Data = [
    parseInt(document.getElementById('loanAmount').value),
    parseInt(document.getElementById('emiResult').innerHTML.replace(/[^\d.]/g, ''), 10),
  ];


  const ctx = document.getElementById('myChart');
  
  myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: [
        'principal',
        'EMI',
      ],
      datasets: [{
        data: Data,
        backgroundColor: [
          '#f08205',
          'rgb(100 209 100)',
          'rgb(86, 205, 255)'
        ],
        hoverOffset: 1
      }]
    },
  
  });
  
 }



//  setting  value in inputs is value if 0

//set  loan input 
function loanInput() {
  const loanAmountInput = document.getElementById('loanAmount');
  let loanAmount = parseFloat(loanAmountInput.value);
  if (isNaN(loanAmount) || loanAmount < 1) {
    loanAmountInput.value = "500000";
  }
}

//set tenure input
function tenureInput() {
  const tenureInput = document.getElementById('tenure');
  let teunreValue = parseFloat(tenureInput.value);
  if (isNaN(teunreValue) || teunreValue < 1) {
    tenureInput.value = "10";
  }
}

//set inntrest rate 
function interestRateInput() {
  const interestRateInput = document.getElementById('interestRate');
  let interestRateValue = parseFloat(interestRateInput.value);
  if (isNaN(interestRateValue) || interestRateValue < 1) {
    interestRateInput.value = "9";
  }
}




// update the  all input value by  tab (home,business,personal)
function updateInput(value){
   let amountInput = document.getElementById('loanAmount');
   let intrestInput = document.getElementById('interestRate');
   let tenureInput = document.getElementById('tenure');
    let getTanureType = document.querySelector('input[name="tenureType"]:checked').value;

    //for home
    if (value === 'home') {
      amountInput.value = document.getElementById('range').value;
      tenureInput.value = (getTanureType === 'years') ? document.getElementById('range2').value : document.getElementById('range2_2').value;
      intrestInput.value = document.getElementById('range3').value;
    }
    

  //for business
  if(value === 'business')
  {
amountInput.value = document.getElementById('businessLoanRange').value;
tenureInput.value =  (getTanureType === 'years') ? tenureValueYear = document.getElementById('businessTenureYear').value : document.getElementById('businessTenureMonth').value;
intrestInput.value =  document.getElementById('BusinessIntrestRateRange').value;
  }
  

  //for personal
  if(value === 'personal'){
    amountInput.value  = document.getElementById('personalLoanRange').value;;
    tenureInput.value =  (getTanureType === 'years') ? tenureValueYear = document.getElementById('personalTenureYear').value : document.getElementById('personalTenureMonth').value;
    intrestInput.value = document.getElementById('PersonalIntrestRateRange').value;
  }

}



//change  tenure input on check box 

function updateTenure(value){
  var tenure = document.getElementById('tenure');
  let title =  document.getElementById('mainTitle').innerHTML;

  //change input value by year 
if(value ===  'years'){
 switch (title) {
  case 'Home Loan':
    tenure.value = document.getElementById('range2').value;
    break;
  case 'Business Loan':
    tenure.value =  document.getElementById('businessTenureYear').value;
  break; 
  case 'Personal Loan':
    tenure.value = document.getElementById('personalTenureYear').value;
    break;
} }
//change input value by month
else{
  switch (title) {
    case 'Home Loan':
      tenure.value = document.getElementById('range2_2').value;
      break;
    case 'Business Loan':
      tenure.value =  document.getElementById('businessTenureMonth').value;
    break; 
    case 'Personal Loan':
      tenure.value = document.getElementById('personalTenureMonth').value;
      break;
  }

}
}


