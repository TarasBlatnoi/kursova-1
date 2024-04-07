async function filterProductGender(value) {
  const products = new Products();
  const allProducts = await products.getProducts();
  const ui = new UI();
  const labelsSex = document.querySelectorAll(".sex");
  ui.displayProducts([]);
  labelsSex.forEach((label) => {
    if (label.classList.contains("active")) {
      if (label.id.toUpperCase() === value.toUpperCase()) {
        label.classList.remove("active");
      } else {
        const filteredProducts = allProducts.filter(
          (product) => product.gender.toUpperCase() === label.id.toUpperCase()
        );
        ui.addProducts(filteredProducts);
      }
    } else {
      if (label.id.toUpperCase() === value.toUpperCase()) {
        label.classList.add("active");
        const filteredProducts = allProducts.filter(
          (product) => product.gender.toUpperCase() === value.toUpperCase()
        );
        ui.addProducts(filteredProducts);
      }
    }
  });
  if (!document.querySelectorAll(".card").length) {
    ui.displayProducts(allProducts);
  }
}
