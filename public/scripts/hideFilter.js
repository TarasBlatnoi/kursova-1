document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".Select-Hide").addEventListener("click", function () {
    const filterContainer = document.querySelector(".left-filter");
    const icon = document.querySelector(".icon-filter");
    const products = document.getElementById("products");
    if (!filterContainer.classList.contains("left-filter-hide")) {
      filterContainer.classList.add("left-filter-hide");
      filterContainer.style.margin = "0 0 0 -45vh";
      products.style.width = "90%";
      products.style.columnGap = "3em";
      icon.classList.add("icon-filter-rotate");
    } else {
      filterContainer.classList.remove("left-filter-hide");
      products.style.width = "70%";
      filterContainer.style.margin = "0 0 0 0";
      products.style.columnGap = "2em";
      icon.classList.remove("icon-filter-rotate");
    }
  });
});
