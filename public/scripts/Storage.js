let cart = []

export default class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products))
  }
  static saveFavoriteProducts(favProducts) {
    localStorage.setItem("favorite-products", JSON.stringify(favProducts))
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"))
    return products.find((product) => {
      return product.id === id
    })
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
