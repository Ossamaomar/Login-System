const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const loginBtn = document.querySelector(".login-btn");
const emailAlert = document.querySelector(".email-alert");
const passwordAlert = document.querySelector(".password-alert");
const loginAlert = document.querySelector(".login-alert");
let userIndex = 0;
let emailTestGlobalState = false;
let passwordTestGlobalState = false;


emailInput.addEventListener('input', function(){
    const inputState = emailValidation(emailInput.value);
    emailTestGlobalState = inputState;
    if (inputState){
        emailInput.classList.add("is-valid");
        emailInput.classList.remove("is-invalid");
    }
    else
    {
        emailInput.classList.remove("is-valid");
        emailInput.classList.add("is-invalid");
    }
});

passwordInput.addEventListener('input', function(){
    const inputState = passwordValidation(passwordInput.value);
    passwordTestGlobalState = inputState;
    if (inputState){
        passwordInput.classList.add("is-valid");
        passwordInput.classList.remove("is-invalid");
    }
    else
    {
        passwordInput.classList.remove("is-valid");
        passwordInput.classList.add("is-invalid");
    }
});

loginBtn.addEventListener('click', function(){
    let loginState = false;
    if (emailTestGlobalState === false) {
        emailAlert.classList.remove("d-none")
        passwordAlert.classList.add("d-none")
    }
    else
    {
        emailAlert.classList.add("d-none")
        if (passwordTestGlobalState === false) {
            passwordAlert.classList.remove("d-none")
        }
    }
    if (emailTestGlobalState === true & passwordTestGlobalState === true) {
        emailAlert.classList.add("d-none");
        passwordAlert.classList.add("d-none");
        loginState = checkForDataInLocalStorage();
        if (loginState) {
            window.open('welcome-page.html',"_self");
        }
        
    }
    
});


function emailValidation(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const retVal = regex.test(email);
    return retVal;
}

function passwordValidation(password) {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    const retVal = regex.test(password);
    return retVal;
}

export const exportObj = {
    emailInput,
    passwordInput,
    emailAlert,
    passwordAlert,
    emailTestGlobalState,
    passwordTestGlobalState,
    userIndex,
    emailValidation,
    passwordValidation
}

function checkForDataInLocalStorage(){
    const databBase = JSON.parse(localStorage.getItem("users-data"));
    let emailFlag = false;
    let passwordFlag = false;
    let retVal = false;
    for (let index = 0; index < databBase.length; index++) {
        if (emailInput.value === databBase[index].email) {
            emailFlag = true;
            if (passwordInput.value === databBase[index].password) {
                passwordFlag = true;
                userIndex = index;
            }
        }
    }

    if (emailFlag === false) {
        console.log("This email is not registered! Please signup if you don't have an account");
        loginAlert.innerHTML = "This email is not registered! Please sign up if you don't have an account."
        loginAlert.classList.remove("d-none");
    }
    else
    {
        if (passwordFlag === false) {
            console.log("Password is incorrect! Please enter a correct password.");
            loginAlert.innerHTML = "Password is incorrect! Please enter a correct password."
            loginAlert.classList.remove("d-none");
        }
        else{
            loginAlert.classList.add("d-none");
            retVal = true;
        }
    }
    return retVal;
}
console.log(JSON.parse(localStorage.getItem("users-data")));
