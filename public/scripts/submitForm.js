"use strict"
import emailValidator from "./emailValidator.js"
const wrongEmailSpan = document.createElement("span")
wrongEmailSpan.textContent = "Invalid email address"
wrongEmailSpan.classList.add("wrongEmail")
const form = document.getElementById("login-form")
function emailListener() {
  let emailInput = document.getElementById("email")
  const inputBox = document.querySelector(".inputbox")
  console.log(inputBox)
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
function handleSubmit() {
  form.addEventListener("submit", () => {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { email, password },
    })
  })
}
handleSubmit()
emailListener()
