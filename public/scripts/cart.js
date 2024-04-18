"use strict"
//variables
const cartBtn = document.querySelector(".cart-btn")
const closeCartBtn = document.querySelector(".close-cart")
const clearCartBtn = document.querySelector(".clear-cart")
const cartDOM = document.querySelector(".cart")
const cartOverlay = document.querySelector(".cart-overlay")
const cartItems = document.querySelector(".cart-items")
const cartTotal = document.querySelector(".cart-total")
const cartContent = document.querySelector(".cart-content")
const productsDOM = document.querySelector(".products-center")
// cart
let cart = []
// buttons
let buttonsDOM = []
//getting the products
class Products {
  static cachedData = null

  async getProducts() {
    try {
      if (Products.cachedData) {
        return Products.cachedData
      }
      let result = await fetch("/api/v1/products")
      let resultParsed = await result.json()
      let products = resultParsed.result
      products = products.map((item) => {
        const name = item.name
        const price = item.price
        const id = item.ProductID
        const image = item.image
        const sex = item.sex
        return { name, price, id, image, sex }
      })
      return products
    } catch (error) {
      console.log(error)
    }
  }
}
 async function filterProductGender(value) {
  const products = new Products()
  const allProducts = await products.getProducts()
  console.log(allProducts)
  const ui = new UI()
  const labelsSex = document.querySelectorAll(".sex")
  ui.displayProducts([])
  labelsSex.forEach((label) => {
    if (label.classList.contains("active")) {
      if (label.id.toUpperCase() === value.toUpperCase()) {
        label.classList.remove("active")
      } else {
        const filteredProducts = allProducts.filter(
          (product) => product.sex.toUpperCase() === label.id.toUpperCase(),
        )
        ui.addProducts(filteredProducts)
      }
    } else {
      if (label.id.toUpperCase() === value.toUpperCase()) {
        label.classList.add("active")
        const filteredProducts = allProducts.filter(
          (product) => product.sex.toUpperCase() === value.toUpperCase(),
        )
        ui.addProducts(filteredProducts)
      }
    }
  })
  if (!document.querySelectorAll(".card").length) {
    ui.displayProducts(allProducts)
  }
}
// display products
 class UI {
  displayProducts(products) {
    let result = ""
    products.forEach((product) => {
      result += `
             <div class="card Дорожній">
          <div class="image-container">
            <img src=data:image/jpeg;base64,${product.image} alt="" />
          </div>
          <button class="bag-btn" data-id=${product.id}>
          <i class="fas fa-shopping-cart">додати в кошик</i>
          </button>
          <div class="container">
            <h3 class="product-name">${product.name}</h3>
            <h5>$${product.price}</h5>
          </div>
        </div>
      `
    })
    productsDOM.innerHTML = result
  }
  addProducts(products) {
    let result = ""
    products.forEach((product) => {
      result += `
             <div class="card Дорожній">
          <div class="image-container">
            <img src=${product.image} alt="" />
          </div>
          <button class="bag-btn" data-id=${product.id}>
          <i class="fas fa-shopping-cart">додати в кошик</i>
          </button>
          <div class="container">
            <h3 class="product-name">${product.title}</h3>
            <h5>$${product.price}</h5>
          </div>
        </div>
      `
    })
    productsDOM.innerHTML += result
  }
  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")]
    buttonsDOM = buttons
    buttons.forEach((button) => {
      let id = button.dataset.id
      let inCart = cart.find((item) => item.id === id)
      if (inCart) {
        button.innerText = "В кошику"
        button.disabled = true
      }
      button.addEventListener("click", (event) => {
        event.target.innerText = "В кошику"
        event.target.disabled = true
        // get product from products
        let cartItem = { ...Storage.getProduct(id), amount: 1 }
        // add product to the card
        cart = [...cart, cartItem]
        // save card in local storage
        Storage.saveCart(cart)
        // set cart values
        this.setCartValues(cart)
        // display cart item
        this.addCartItem(cartItem)
        // show the cart
        this.showCart()
      })
    })
  }
  setCartValues(cart) {
    let tempTotal = 0
    let itemsTotal = 0
    cart.map((item) => {
      tempTotal += item.price * item.amount
      itemsTotal += item.amount
    })
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2))
    cartItems.innerText = itemsTotal
  }
  addCartItem(item) {
    const div = document.createElement("div")
    div.classList.add("cart-item")
    div.innerHTML = `<img src="${item.image}" alt="product" />
          <div>
            <h4 class="nowrap">${item.title}</h4>
            <h5>$${item.price}</h5>
            <span class="remove-item" data-id=${item.id}>Видалити</span>
          </div>
          <div class="icons-change">
            <i class="fas fa-chevron-up" data-id=${item.id}></i>
            <p class="item-amount">${item.amount}</p>
            <i class="fas fa-chevron-down" data-id=${item.id}></i>
          </div>`
    cartContent.appendChild(div)
  }
  showCart() {
    cartOverlay.classList.add("transparentBcg")
    cartDOM.classList.add("showCart")
  }
  setupAPP() {
    cart = Storage.getCart()
    this.setCartValues(cart)
    this.populateCart(cart)
    cartBtn.addEventListener("click", this.showCart)
    closeCartBtn.addEventListener("click", this.hideCart)
  }
  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item))
  }
  hideCart() {
    cartOverlay.classList.remove("transparentBcg")
    cartDOM.classList.remove("showCart")
  }
  cartLogic() {
    // clear cart button
    clearCartBtn.addEventListener("click", () => {
      this.clearCart()
    })
    // cart functionality
    cartContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-item")) {
        let removeItem = event.target
        let id = removeItem.dataset.id
        cartContent.removeChild(removeItem.parentElement.parentElement)
        this.removeItem(id)
      } else if (event.target.classList.contains("fa-chevron-up")) {
        let addAmount = event.target
        let id = addAmount.dataset.id
        let tempItem = cart.find((item) => item.id === id)
        tempItem.amount += 1
        Storage.saveCart(cart)
        this.setCartValues(cart)
        addAmount.nextElementSibling.innerText = tempItem.amount
      } else if (event.target.classList.contains("fa-chevron-down")) {
        let lowerAmount = event.target
        let id = lowerAmount.dataset.id
        let tempItem = cart.find((item) => item.id === id)
        tempItem.amount -= 1
        if (tempItem.amount > 0) {
          Storage.saveCart(cart)
          this.setCartValues(cart)
          lowerAmount.previousElementSibling.innerText = tempItem.amount
        } else {
          cartContent.removeChild(lowerAmount.parentElement.parentElement)
          this.removeItem(id)
        }
      }
    })
  }
  clearCart() {
    let cartItems = cart.map((item) => item.id)
    cartItems.forEach((id) => this.removeItem(id))
    console.log(cartContent.children)
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0])
    }
    this.hideCart()
  }
  removeItem(id) {
    cart = cart.filter((item) => item.id !== id)
    this.setCartValues(cart)
    Storage.saveCart(cart)
    let button = this.getSingleButton(id)
    button.disabled = false
    button.innerHTML = `<i class="fas fa-shopping-cart"></i>додати в кошик`
  }
  getSingleButton(id) {
    return buttonsDOM.find((button) => button.dataset.id === id)
  }
}
//local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products))
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"))
    return products.find((product) => product.id === id)
  }
  static saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart))
  }
  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : []
  }
}

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
