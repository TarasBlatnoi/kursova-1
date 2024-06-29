import Products from "./Products.js"
import UI from "./UI.js"
import { updateFavoriteProducts } from "./favoriteBtnHandler.js"

export default function wrapperFilterProductGender() {
  const sexForm = document.querySelector(".run-form")
  const ui = new UI()

  const activeDots = document
    .querySelector(".sex-filter")
    ?.getElementsByClassName("active")


  if (!activeDots) return


  async function filterProductGender(event) {
    const target = event.target
    if (!target.classList.contains("input-value")) return
    target.classList.toggle("active")

    const allProducts = JSON.parse(localStorage.getItem("products"))

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

  sexForm?.addEventListener("click", filterProductGender)

}
