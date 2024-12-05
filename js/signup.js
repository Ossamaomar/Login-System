import {exportObj} from './index.js';
const usernameInput = document.querySelector("#usernameInput");
const signupBtn = document.querySelector(".signup-btn");
const usernameAlert = document.querySelector(".username-alert");
let usernameGlobalState = false;
let usersContainer = [];

usernameInput.addEventListener("input", function(){
    const inputState = usernameValidation(usernameInput.value);
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


exportObj.emailInput.addEventListener('input', function(){
    const inputState = exportObj.emailValidation(emailInput.value);
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

exportObj.passwordInput.addEventListener('input', function(){
    const inputState = exportObj.passwordValidation(passwordInput.value);
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

signupBtn.addEventListener('click', function(){
    if (usernameGlobalState === false) {
        usernameAlert.classList.remove("d-none");
        exportObj.emailAlert.classList.add("d-none");
        exportObj.passwordAlert.classList.add("d-none");
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
        saveUserCredentialsToLocalStorage();
        window.open('index.html',"_self");
    }
})

function usernameValidation(username){
    const regex = /^[a-zA-Z][a-zA-Z0-9._]{2,15}$/;
    const retVal = regex.test(username);
    return retVal;
}


function saveUserCredentialsToLocalStorage() {
    let userObj = {
        username: usernameInput.value,
        email: exportObj.emailInput.value,
        password: exportObj.passwordInput.value
    };
    usersContainer.push(userObj);
    localStorage.setItem("users-data", JSON.stringify(usersContainer));
}

if (localStorage.getItem("users-data") !== null) {
    usersContainer = JSON.parse(localStorage.getItem("users-data"));
    console.log(usersContainer); 
}