

const logoutBtn = document.querySelector(".logout-btn");
const usernameSpan = document.querySelector(".user-name-span");
let usersContainer  = [];
usersContainer = JSON.parse(localStorage.getItem("users-data"));

console.log(JSON.parse(localStorage.getItem("users-data")));

// Check which user has the isLogin attribute set to true by looping through them
for (let index = 0; index < usersContainer.length; index++) {
    if (usersContainer[index].isLogin === true) {
        usernameSpan.innerHTML = usersContainer[index].username;
        usersContainer[index].isLogin = false;
        localStorage.setItem("users-data", JSON.stringify(usersContainer));
    }    
}

logoutBtn.addEventListener('click', function(){
    window.open('../index.html', '_self')
})