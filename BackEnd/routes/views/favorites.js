document.addEventListener("DOMContentLoaded", async () => {
  const favoriteProducts = await fetch("/favorites/products")
  let favoriteProductsParsed = await favoriteProducts.json()
  console.log(favoriteProductsParsed)
})
