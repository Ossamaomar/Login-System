

import { exportObj } from "./utils.js";
const loginBtn = document.querySelector(".login-btn");
const loginAlert = document.querySelector(".login-alert");


// Adding an event listener to the email input field to handle the email validation from the user
exportObj.emailInput.addEventListener('input', function(){ 
    const inputState = exportObj.emailValidation(exportObj.emailInput.value); // This variable declares whether the input is valid or not according to the validation rules
    
    // emailTestGlobalState and passwordTestGlobalState are used as indication to show alerts or not when the user clicks the login button
    exportObj.emailTestGlobalState = inputState;
    if (inputState){
        exportObj.emailInput.classList.add("is-valid");
        exportObj.emailInput.classList.remove("is-invalid");
    }
    else
    {
        exportObj.emailInput.classList.remove("is-valid");
        exportObj.emailInput.classList.add("is-invalid");
    }
});


// Adding an event listener to the password input field to handle the password validation from the user
exportObj.passwordInput.addEventListener('input', function(){
    const inputState = exportObj.passwordValidation(exportObj.passwordInput.value);// This variable declares whether the input is valid or not according to the validation rules
    
    // emailTestGlobalState and passwordTestGlobalState are used as indication to show alerts or not when the user clicks the login button
    exportObj.passwordTestGlobalState = inputState;
    if (inputState){
        exportObj.passwordInput.classList.add("is-valid");
        exportObj.passwordInput.classList.remove("is-invalid");
    }
    else
    {
        exportObj.passwordInput.classList.remove("is-valid");
        exportObj.passwordInput.classList.add("is-invalid");
    }
});

// This event listener attached to the login button is to handle showing alerts if the user entered data in invalid from, checks for email existence
// and also change the window to the welcome page if inputs are valid
loginBtn.addEventListener('click', function(){
    let loginState = false; // This variable declares whether this login session is valid or not
    

    if (exportObj.emailTestGlobalState === false) {
        exportObj.emailAlert.classList.remove("d-none")
        exportObj.passwordAlert.classList.add("d-none")
    }
    else
    {
        exportObj.emailAlert.classList.add("d-none")
        if (exportObj.passwordTestGlobalState === false) {
            exportObj.passwordAlert.classList.remove("d-none")
        }
    }
    if (exportObj.emailTestGlobalState === true & exportObj.passwordTestGlobalState === true) {
        exportObj.emailAlert.classList.add("d-none");
        exportObj.passwordAlert.classList.add("d-none");
        loginState = checkForDataInLocalStorage();
        if (loginState) {
            window.open('pages/welcome-page.html',"_self");
        }
        
    }
    
});


// This function checks whether the email entered by the user is registered or not
function checkForDataInLocalStorage(){
    const databBase = JSON.parse(localStorage.getItem("users-data"));
    let emailFlag = false;
    let passwordFlag = false;
    let retVal = false;
    for (let index = 0; index < databBase.length; index++) {
        if (exportObj.emailInput.value === databBase[index].email) {
            emailFlag = true;
            if (exportObj.passwordInput.value === databBase[index].password) {
                passwordFlag = true;
                databBase[index].isLogin = true; // The attribute isLogin gives an indication that this user is currently logged in which gives informatoin to the welcome page to show which username.
                localStorage.setItem("users-data", JSON.stringify(databBase)); 
            }
        }
    }

    // First check for if the email is existed in the database
    if (emailFlag === false) {
        console.log("This email is not registered! Please signup if you don't have an account");
        loginAlert.innerHTML = "This email is not registered! Please sign up if you don't have an account."
        loginAlert.classList.remove("d-none");
    }

    // If the email is existed in the database then check for the password entered for that email is right or not
    else
    {
        if (passwordFlag === false) {
            console.log("Password is incorrect! Please enter a correct password.");
            loginAlert.innerHTML = "Password is incorrect! Please enter a correct password."
            loginAlert.classList.remove("d-none");
        }

        // If the email and password are existed for a user in the database then return a valid login state from the function
        else{
            loginAlert.classList.add("d-none");
            retVal = true;
        }
    }
    return retVal;
}
console.log(JSON.parse(localStorage.getItem("users-data")));
