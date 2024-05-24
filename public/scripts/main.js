"use strict"
import hideFilter from "./hideFilter.js"
import filterProductGender from "./filterProductGender.js"
import changeYear from "./changeYear.js"
import Products from "./Products.js"
import UI from "./UI.js"
import Storage from "./Storage.js"
import updateCountdown from "./updateCountdown.js"
import user from "./user.js"
import showHeader from "./showHeader.js"
import filterProductsName from "./filterProductByName.js"

user()
updateCountdown()
changeYear()
filterProductGender()
hideFilter()
showHeader()
const products = document.getElementById("products")
if (products) {
  document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI()
    const products = new Products()
    //setup app
    ui.setupAPP()
    //get all products
    products
      .getProducts("/api/v1/products")
      .then((products) => {
        ui.displayProducts(products)
        Storage.saveProducts(products)
      })
      .then(() => {
        ui.getBagButtons()
        ui.cartLogic()
      })
  })
}

const searchElement = document.getElementById("search")
searchElement.addEventListener("input", filterProductsName)

export { UI }
export { Storage }
export { Products }
