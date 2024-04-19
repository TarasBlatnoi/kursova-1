"use strict"
import hideFilter from "./hideFilter.js"
import filterProductGender from "./filterProductGender.js"
import Products from "./Products.js"
import UI from "./UI.js"
import Storage from "./Storage.js"
filterProductGender()
hideFilter()

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI()
  const products = new Products()
  //setup app
  ui.setupAPP()
  //get all products
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products)
      Storage.saveProducts(products)
    })
    .then(() => {
      ui.getBagButtons()
      ui.cartLogic()
    })
})
