//btn
let signupBtn = document.getElementById("signupBtn");
let loginBtn = document.getElementById("loginBtn");
let applyBtn = document.getElementById("applyBtn");
//input
let nameinfo = document.getElementById("name");
let surnameinfo = document.getElementById("surname");
let emailinfo = document.getElementById("email");
let passwordinfo = document.getElementById("password");
//div
let Sign = document.getElementById("Sign");
var outputDiv = document.getElementById("output");

loginBtn.onclick = function () {
  surnameField.style.opacity = "0";
  nameField.style.opacity = "0";
  nameField.style.maxHeight = "0";
  surnameField.style.maxHeight = "0";
  Sign.innerHTML = "Log In";
  signupBtn.classList.add("disable");
  loginBtn.classList.remove("disable");
};

signupBtn.onclick = function () {
  surnameField.style.opacity = "1";
  nameField.style.opacity = "1";
  nameField.style.maxHeight = "60px";
  surnameField.style.maxHeight = "60px";
  Sign.innerHTML = "Sign Up";
  signupBtn.classList.remove("disable");
  loginBtn.classList.add("disable");
};

signupBtn.onclick = function(){
    surnameField.style.opacity = "1";
    nameField.style.opacity = "1";
    nameField.style.maxHeight = "60px";
    surnameField.style.maxHeight = "60px";
    Sign.innerHTML = "Sign Up";
    signupBtn.classList.remove("disable");
    loginBtn.classList.add("disable");
}

applyBtn.onclick = function(){
    let name = nameinfo.value;
    let surname = surnameinfo.value;
    let email = emailinfo.value;
    let password = passwordinfo.value;
    const raw = localStorage.getItem(email);
    const person = JSON.parse(raw);

    if (signupBtn.classList.contains("disable")){
        if (!(email=="") && !(password=="")){
            if (email in localStorage){
                if (person.userPassword == password){
                    const userString = localStorage.getItem(email);
                    const userObject = JSON.parse(userString);
                    const name = userObject.userName;
                    console.log('success')
                    sessionStorage.setItem('name', name);
                    window.location.href = "/";
                }
                else{
                    outputDiv.textContent = "Wrong password";
                }
            }
            else{
                outputDiv.textContent = "Wrong email";
            }
        }
        else{
            outputDiv.textContent = "Fill in all fields";
        }

    }
    if (loginBtn.classList.contains("disable")){
        const user = {
            userName: name,
            userSurname: surname,
            userEmail: email,
            userPassword: password,
        }
        if (!(name=="") && !(surname=="") && !(email=="") && !(password=="")){
            if (!(user.userEmail in localStorage)){
            localStorage.setItem(email, JSON.stringify(user))
            sessionStorage.setItem('name', name);
            window.location.href = "/";
            }
            else {
                outputDiv.textContent = 'This Email is already in use'
            }
        }
        else{
            outputDiv.textContent = "Fill in all fields";
        }
    }
}
