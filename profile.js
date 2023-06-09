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

applyBtn.onclick = function () {
  let name = nameinfo.value;
  let surname = surnameinfo.value;
  let email = emailinfo.value;
  let password = passwordinfo.value;
  if (signupBtn.classList.contains("disable")) {
    if (email in localStorage) {
      const raw = localStorage.getItem(email);
      const person = JSON.parse(raw);
      if (person.userPassword == password) {
        console.log("success");
      } else {
        console.log("wrong password");
      }
    } else {
      console.log("wrong email");
    }
  }
  if (loginBtn.classList.contains("disable")) {
    const user = {
      userName: name,
      userSurname: surname,
      userEmail: email,
      userPassword: password,
    };
    localStorage.setItem(email, JSON.stringify(user));
  }
};
