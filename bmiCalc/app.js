const massInput = document.getElementById('mass');
const heightInput = document.getElementById('height');
const pPrint = document.querySelector('p');
const pPrintSecond = document.querySelector('.second');

const calculate = document.querySelector('input[type=submit]');

const bmi = (mass, height) => {
  const massNr = Number(mass);
  const heightNr = Number(height);

  return massNr / ((heightNr * heightNr) / 10000);
};

function setInputFilter(textbox, inputFilter) {
  [
    'input',
    'keydown',
    'keyup',
    'mousedown',
    'mouseup',
    'select',
    'contextmenu',
    'drop'
  ].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty('oldValue')) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
    });
  });
}

setInputFilter(massInput, function(value) {
  return /^\d*\d*$/.test(value);
});

setInputFilter(heightInput, function(value) {
  return /^\d*\d*$/.test(value);
});

const printResult = bmi => {
  if (bmi < 15) {
    pPrint.innerText = 'Something went wrong, please check your numbers';
    pPrintSecond.textContent = '';
    pPrint.className = 'error';
  } else if (bmi < 18.5) {
    pPrint.textContent = `Your BMI (body mass index) is ${bmi}`;
    pPrintSecond.textContent = 'You are a UNDERWEIGHT category';
    pPrint.className = 'status';
    pPrintSecond.className = 'error';
  } else if (bmi >= 18.5 && bmi < 25) {
    pPrint.textContent = `Your BMI (body mass index) is ${bmi}`;
    pPrintSecond.textContent = 'You are a NORMAL WEIGHT category';
    pPrint.className = 'status';
    pPrintSecond.className = 'green';
  } else if (bmi >= 25 && bmi < 30) {
    pPrint.textContent = `Your BMI (body mass index) is ${bmi}`;
    pPrintSecond.textContent = 'You are a OVERWEIGHT category';
    pPrint.className = 'status';
    pPrintSecond.className = 'error';
  } else {
    pPrint.textContent = `Your BMI (body mass index) is ${bmi}`;
    pPrintSecond.textContent = 'You are a OBESITY category!!!';
    pPrint.className = 'status';
    pPrintSecond.className = 'darkRed';
  }
};

calculate.addEventListener('click', e => {
  e.preventDefault();
  if (massInput.value === '' || heightInput.value === '') {
    pPrint.innerText = 'Please add your weight and height';
    pPrintSecond.textContent = '';
    pPrint.className = 'error';
  } else {
    const bmiCalc = bmi(massInput.value, heightInput.value);
    printResult(bmiCalc.toFixed(2));
    pPrint.classList.remove('hidden');
    pPrintSecond.classList.remove('hidden');
    // massInput.value = '';
    // heightInput.value = '';
  }
});
