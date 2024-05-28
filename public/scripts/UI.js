import Storage from "./Storage.js"

let cart
let buttonsDOM = []

const cartBtn = document.querySelector(".cart-btn")
const closeCartBtn = document.querySelector(".close-cart")
const clearCartBtn = document.querySelector(".clear-cart")
const cartDOM = document.querySelector(".cart")
const cartOverlay = document.querySelector(".cart-overlay")
const cartItems = document.querySelector(".cart-items")
const cartTotal = document.querySelector(".cart-total")
const cartContent = document.querySelector(".cart-content")
const productsDOM = document.querySelector(".products-center")

export default class UI {
  displayProducts(products) {
    let result = ""
    products.forEach((product) => {
      result += `
      <div class="card Дорожній">
      <div class="image-container">
        <img src=data:image/jpeg;base64,${product.image} alt="" />
      </div>
      <div class="container">
      <div class="description"> 
        <div class="product-name"> <p class="product-brand-name">${product.name}</p><p class="product--info">${product.productDescription}</p>
        </div>
        <h4>$${product.price}</h4>
      </div>
      <div class="btn--product">
        <button class="btn bag-btn" data-id=${product.id}>
        <i class="fas fa-shopping-cart"> додати в кошик</i>
        </button>
        <div class="favorite">
        <i id="heart--btn" class="far fa-heart"></i>
        </div>
      </div>
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
        <img src=data:image/jpeg;base64,${product.image} alt="" />
      </div>
      <div class="container">
      <div class="description"> 
        <h3 class="product-name"> <p class="product-brand-name">${product.name}</p><p class="product--info">${product.productDescription}</p>
        </h3>
        <h4>$${product.price}</h4>
      </div>
        <button class="bag-btn" data-id=${product.id}>
        <i class="fas fa-shopping-cart"> додати в кошик</i>
        </button>
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
      id = Number(id)
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
    div.innerHTML = `<img src=data:image/jpeg;base64,${item.image} alt="product" />
          <div class="cart-name">
            <h4 class="nowrap">${item.name}</h4>
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
    cartOverlay.addEventListener("click", this.hideCart)
  }
  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item))
  }
  hideCart(event) {
    const target = event.target

    if (
      target === this ||
      target?.closest(".close-cart")?.classList.contains("close-cart") ||
      target?.classList?.contains("clear-cart")
    ) {
      cartOverlay.classList.remove("transparentBcg")
      cartDOM.classList.remove("showCart")
    }
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
        id = Number(id)
        cartContent.removeChild(removeItem.parentElement.parentElement)
        this.removeItem(id)
      } else if (event.target.classList.contains("fa-chevron-up")) {
        let addAmount = event.target
        let id = addAmount.dataset.id
        id = Number(id)
        let tempItem = cart.find((item) => item.id === id)
        tempItem.amount += 1
        Storage.saveCart(cart)
        this.setCartValues(cart)
        addAmount.nextElementSibling.innerText = tempItem.amount
      } else if (event.target.classList.contains("fa-chevron-down")) {
        let lowerAmount = event.target
        let id = lowerAmount.dataset.id
        id = Number(id)
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
    ;[...cartContent.children].forEach((cartItem) => cartItem.remove())
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
    return buttonsDOM.find((button) => Number(button.dataset.id) === id)
  }
}
