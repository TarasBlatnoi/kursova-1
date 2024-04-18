export default class Products {
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
