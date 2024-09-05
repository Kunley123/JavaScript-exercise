let calculation = localStorage.getItem('calculation') || '';
function updateCalculator(num) {
    console.log(calculation += num)

    document.querySelector('.js-calculate').innerHTML = calculation;

    localStorage.setItem('calculation', calculation);


}

document.querySelector('.js-calculate').innerHTML = calculation;