export default class Products {
  static cachedData = null
  async getProducts(url) {
    console.log("Get Products called with this url:", url)
    try {
      if (Products.cachedData) {
        return Products.cachedData
      }
      let result = await fetch(url)
      let resultParsed = await result.json()
      let products = resultParsed.result
      products = products.map((item) => {
        const name = item.name
        const price = item.price
        const id = item.ProductID
        const image = item.image
        const sex = item.sex
        const productDescription = item.productDetails
        return { name, productDescription, price, id, image, sex }
      })
      return products
    } catch (error) {
      console.log(error)
    }
  }
}
