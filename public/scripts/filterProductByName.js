export default function filterProductsName() {
  const searchString = this.value
  console.log("hello Filtered Name")

  const productsContainer = document.querySelector(".products-center")

  const filteredProducts = [...productsContainer.children]
    .map((card) => {
      const productBrandName = card.querySelector(".product-brand-name")
      const productName = productBrandName.nextElementSibling
      return { card, productBrandName, productName }
    })
    .forEach((product) => {
      const { card, productBrandName, productName } = product
      console.log(card)
      if (
        productBrandName.textContent.includes(searchString) ||
        productName.textContent.includes(searchString)
      ) {
        card.classList.remove("filter-unmatched")
      } else {
        card.classList.add("filter-unmatched")
      }
    })
}
