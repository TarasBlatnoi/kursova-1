export default function filterProductsName() {
  const searchString = this.value.toLowerCase()

  const productsContainer = document.querySelector(".products-center")

  const filteredProducts = [...productsContainer.children]
    .map((card) => {
      const productBrandName = card.querySelector(".product-brand-name")
      const productDescription = productBrandName.nextElementSibling
      return { card, productBrandName, productDescription }
    })
    .forEach((product) => {
      const { card, productBrandName, productDescription } = product

      if (
        productBrandName.textContent.toLowerCase().includes(searchString) ||
        productDescription.textContent.toLowerCase().includes(searchString)
      ) {
        card.classList.remove("filter-unmatched")
      } else {
        card.classList.add("filter-unmatched")
      }
    })
}
