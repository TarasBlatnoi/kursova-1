"use strict"
import emailValidator from "./emailValidator.js"
const wrongEmailSpan = document.createElement("span")
wrongEmailSpan.textContent = "Invalid email address"
wrongEmailSpan.classList.add("wrongEmail")
const form = document.getElementById("login-form")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const inputBox = document.querySelector(".inputbox")
function emailListener() {
  emailInput.addEventListener("input", () => {
    const email = emailInput.value
    if (!emailValidator(email)) {
      inputBox.style.border = "2px solid red"
      inputBox.style.borderRadius = "13px"
      inputBox.appendChild(wrongEmailSpan)
    } else {
      inputBox.style.border = "none"
      const spanToDelete = inputBox.querySelector("span")
      if (spanToDelete) {
        spanToDelete.remove()
      }
    }
  })
}


form.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
  console.log("button pressed")
  console.log({
    email: emailInput.value,
    password: passwordInput.value,
  })
  e.preventDefault()
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailInput.value,
      password: passwordInput.value,
    }),
  }).then((res) => {
    if (res.redirected) {
      window.location.href = res.url
    }
  })
}
emailListener()
