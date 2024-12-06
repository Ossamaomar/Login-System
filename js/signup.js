

import {exportObj} from './utils.js';
const usernameInput = document.querySelector("#usernameInput");
const signupBtn = document.querySelector(".signup-btn");
const usernameAlert = document.querySelector(".username-alert");
const signupAlert = document.querySelector(".signup-alert");
let usernameGlobalState = false;
let usersContainer = [];

// Adding an event listener to the username input field to handle the username validation from the user
usernameInput.addEventListener("input", function(){
    const inputState = usernameValidation(usernameInput.value);
    
    // usernameGlobalState is used as indication to show alerts or not when the user clicks the login button
    usernameGlobalState = inputState;
    if (inputState){
        usernameInput.classList.add("is-valid");
        usernameInput.classList.remove("is-invalid");
    }
    else
    {
        usernameInput.classList.remove("is-valid");
        usernameInput.classList.add("is-invalid");
    }
});

// Adding an event listener to the email input field to handle the email validation from the user
exportObj.emailInput.addEventListener('input', function(){
    const inputState = exportObj.emailValidation(emailInput.value);
    
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
    const inputState = exportObj.passwordValidation(passwordInput.value);
    
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


// This event listener attached to the signup button is to handle showing alerts if the user entered data in invalid form, checks for email duplication
// and also change the window to the login page if inputs entered are valid
signupBtn.addEventListener('click', function(){
    let signupState= false;
    if (usernameGlobalState === false) {
        usernameAlert.classList.remove("d-none");
        exportObj.emailAlert.classList.add("d-none");
        exportObj.passwordAlert.classList.add("d-none");
        signupAlert.classList.add("d-none");
    }
    else
    {
        usernameAlert.classList.add("d-none");
        if (exportObj.emailTestGlobalState === false) {
            exportObj.emailAlert.classList.remove("d-none")
            exportObj.passwordAlert.classList.add("d-none")
        }
        else
        {
            exportObj.emailAlert.classList.add("d-none");
            if (exportObj.passwordTestGlobalState === false) {
                exportObj.passwordAlert.classList.remove("d-none")
            }
        }
    }

    if (usernameGlobalState === true & exportObj.emailTestGlobalState === true & exportObj.passwordTestGlobalState === true) {
        usernameAlert.classList.add("d-none");
        exportObj.emailAlert.classList.add("d-none");
        exportObj.passwordAlert.classList.add("d-none");
        
        // Check whether email entered is already registered or not
        signupState = checkForEmailDupliactionInLocalStorage();

        if (signupState) {
            saveUserCredentialsToLocalStorage();
            window.open('../index.html',"_self");
        }
        
    }
})

// This applies a check to the username entered with the regex according to it
function usernameValidation(username){
    const regex = /^[a-zA-Z][a-zA-Z0-9._]{2,15}$/;
    const retVal = regex.test(username);
    return retVal;
}

// This function saves the user's credentials if it's all correct and not duplicated to the local storage
function saveUserCredentialsToLocalStorage() {
    let userObj = {
        username: usernameInput.value,
        email: exportObj.emailInput.value,
        password: exportObj.passwordInput.value,
        isLogin: false
    };
    usersContainer.push(userObj);
    localStorage.setItem("users-data", JSON.stringify(usersContainer));
}

// This function checks for email duplication in the data storage and returns a state according to that
function checkForEmailDupliactionInLocalStorage()
{
    let retVal = true;
    let emailIsUnique = true;

    // Looping through the whole local storage and check if the email entered is identical with any email stored in the local storage
    for (let index = 0; index < usersContainer.length; index++) {
        if (emailInput.value === usersContainer[index].email) {
            emailIsUnique = false;
            retVal = false;
        }
    }

    if (emailIsUnique === false) {
        console.log("This email is already registered! please login."); 
        signupAlert.innerHTML = "This email is already registered! Please login."
        signupAlert.classList.remove("d-none");
    }
    else
    {
        signupAlert.classList.add("d-none");
    }

    return retVal;
}

if (localStorage.getItem("users-data") !== null) {
    usersContainer = JSON.parse(localStorage.getItem("users-data"));
    console.log(usersContainer); 
}