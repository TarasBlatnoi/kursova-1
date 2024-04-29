"use strict"
import hideFilter from "./hideFilter.js"
import filterProductGender from "./filterProductGender.js"
import changeYear from "./changeYear.js"
import Products from "./Products.js"
import UI from "./UI.js"
import Storage from "./Storage.js"
import updateCountdown from "./updateCountdown.js"
import user from "./user.js"
user()
updateCountdown()
changeYear()
filterProductGender()
hideFilter()
const products = document.querySelector(".products-center")
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
export { UI }
export { Storage }
export { Products }
