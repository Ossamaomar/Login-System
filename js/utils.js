

// This file contains the definition of the shared elements,variables and functions between the modules.
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const emailAlert = document.querySelector(".email-alert");
const passwordAlert = document.querySelector(".password-alert");
let emailTestGlobalState = false;
let passwordTestGlobalState = false;

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
    emailValidation,
    passwordValidation,
}