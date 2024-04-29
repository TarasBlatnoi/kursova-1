document.addEventListener("DOMContentLoaded", async () => {
  try {
    const favoriteProducts = await fetch("/favorites/products")
    let favoriteProductsParsed = await favoriteProducts.json()

    favoriteProductsParsed = favoriteProductsParsed.result.map((item) => {
      const name = item.name
      const price = item.price
      const id = item.ProductID
      const image = item.image
      const sex = item.sex
      return { name, price, id, image, sex }
    })
    console.log(favoriteProductsParsed)
    return favoriteProductsParsed
  } catch (err) {
    console.error(err)
  }
})
