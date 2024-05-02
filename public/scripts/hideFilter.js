export default function hideFilter() {
  document.addEventListener("DOMContentLoaded", function () {
    const SelectHide = document.querySelector(".Select-Hide")
    if (SelectHide) {
      SelectHide.addEventListener("click", function () {
        const filterContainer = document.querySelector(".left-filter")
        const icon = document.querySelector(".icon-filter")
        const products = document.querySelector(".products-center")
        const wrapper = document.querySelector(".wrapper")
        if (!filterContainer.classList.contains("left-filter-hide")) {
          filterContainer.classList.add("left-filter-hide")
          products.style.width = "78%"
          wrapper.style.margin = "4em 0 0 -45vh"
          products.style.columnGap = "3em"
          icon.classList.add("icon-filter-rotate")
        } else {
          filterContainer.classList.remove("left-filter-hide")
          products.style.width = "70%"
          wrapper.style.margin = "4em 0 0 0"
          products.style.columnGap = "2em"
          icon.classList.remove("icon-filter-rotate")
        }
      })
    }
  })
}
