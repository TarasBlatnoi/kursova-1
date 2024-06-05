import Products from "./Products.js"
import UI from "./UI.js"
import { updateFavoriteProducts } from "./favoriteBtnHandler.js"

export default function wrapperFilterProductGender() {
  const sexForm = document.querySelector(".run-form")
  const ui = new UI()
  const products = new Products()
  const activeDots = document
    .querySelector(".sex-filter")
    ?.getElementsByClassName("active")

  if (!activeDots) return

  async function filterProductGender(event) {
    const target = event.target
    if (!target.classList.contains("input-value")) return
    target.classList.toggle("active")

    const allProducts = await products.getProducts("/api/v1/products")

    const filteredProducts = allProducts.filter((product) =>
      [...activeDots].some(
        (dot) =>
          dot.getAttribute("id").toLowerCase() === product.sex.toLowerCase(),
      ),
    )

    ui.displayProducts(
      !filteredProducts.length && activeDots.length
        ? []
        : !filteredProducts.length
          ? allProducts
          : filteredProducts,
    )
    updateFavoriteProducts()
  }

  sexForm.addEventListener("click", filterProductGender)
}
