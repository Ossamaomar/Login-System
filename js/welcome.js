import { exportObj } from "./index.js";
const logoutBtn = document.querySelector(".logout-btn");
const usernameSpan = document.querySelector(".user-name-span");
let usersContainer  = [];
usersContainer = JSON.parse(localStorage.getItem("users-data"));

for (let index = 0; index < usersContainer.length; index++) {
    if (index === exportObj.userIndex) {
        usernameSpan.value = usersContainer[index].username;
    }
    
}

logoutBtn.addEventListener('click', function(){
    window.open('index.html', '_self')
})

