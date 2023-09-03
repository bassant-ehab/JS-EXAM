/// <reference types="../@types/jquery" />



// Get references to the form inputs and alert elements
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const phoneInput = document.getElementById('phoneInput');
const ageInput = document.getElementById('ageInput');
const passwordInput = document.getElementById('passwordInput');
const repasswordInput = document.getElementById('repasswordInput');

const nameAlert = document.getElementById('nameAlert');
const emailAlert = document.getElementById('emailAlert');
const phoneAlert = document.getElementById('phoneAlert');
const ageAlert = document.getElementById('ageAlert');
const passwordAlert = document.getElementById('passwordAlert');
const repasswordAlert = document.getElementById('repasswordAlert');
const submitButton = document.querySelector('#contactbtn[type="submit"]');

$(document).ready(function () {
    // Toggle side bar
    $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
    $('.open_Tab .btn_open').on('click', function () {
        $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
    })

    // Input Check
    $('#nameInput').on('input', function () {
        showHideAlert(nameAlert, nameInput.value.trim() === '')
    });
    $('#emailInput').on('input', function () {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        showHideAlert(emailAlert, !emailRegex.test(emailInput.value))
    });
    $('#phoneInput').on('input', function () {
        const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        showHideAlert(phoneAlert, !phoneNumberRegex.test(phoneInput.value))
    });
    $('#ageInput').on('input', function () {
        showHideAlert(ageAlert, ageInput.value.trim() === '')
    });
    $('#passwordInput').on('input', function () {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
        showHideAlert(passwordAlert, !passwordRegex.test(passwordInput.value))
    });
    $('#repasswordInput').on('input', function () {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
        showHideAlert(
            repasswordAlert,
            !passwordRegex.test(repasswordInput.value) || passwordInput.value != repasswordInput.value
        )
    });
});

function showHideAlert(alert, show) {
    if (show) {
      alert.classList.remove('d-none');
    } else {
      alert.classList.add('d-none');
    }
  }