let jsonData = localStorage.getItem("productsData");

if (jsonData) {
  processProducts(JSON.parse(jsonData));
} else {
  fetch("/api/v1/products.json")
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("productsData", JSON.stringify(data));

      processProducts(data);
    })
    .catch((error) => {
      console.log("Error fetching the JSON file:", error);
    });
}

function processProducts(data) {
  for (let i of data.data) {
  }
}

fetch("/api/v1/products.json")
  .then((response) => response.json())
  .then((data) => {
    for (let i of data.data) {
      let card = document.createElement("div");

      card.classList.add("card", i.category, "hide");

      let imgContainer = document.createElement("div");
      imgContainer.classList.add("image-container");

      let image = document.createElement("img");
      image.setAttribute("src", i.image);
      imgContainer.appendChild(image);
      card.appendChild(imgContainer);

      let container = document.createElement("div");
      container.classList.add("container");

      let name = document.createElement("h3");
      name.classList.add("product-name");
      name.innerText = i.productName.toUpperCase();
      container.appendChild(name);

      let price = document.createElement("h5");
      price.innerText = "$" + i.price;
      container.appendChild(price);
      card.appendChild(container);
      document.getElementById("products").appendChild(card);

      let addToCartBtn = document.createElement("button");
      addToCartBtn.innerText = "Add to Shopping Cart";
      addToCartBtn.classList.add("add-to-cart-btn");
      card.appendChild(addToCartBtn);

      document.getElementById("products").appendChild(card);
    }
  })
  .catch((error) => {
    console.log("Error fetching the JSON file:", error);
  });

function filterProduct(value) {
  let input = document.querySelectorAll(".input-value");
  input.forEach((input) => {
    if (value.toUpperCase() == input.innerText.toUpperCase()) {
      input.classList.add("active");
    } else {
      input.classList.remove("active");
    }
  });

  let elements = document.querySelectorAll(".card");
  elements.forEach((element) => {
    if (value == "all") {
      element.classList.remove("hide");
    } else {
      if (element.classList.contains(value)) {
        element.classList.remove("hide");
      } else {
        element.classList.add("hide");
      }
    }
  });
}

document.getElementById("search").addEventListener("click", () => {
  let searchInput = document.getElementById("search-input").value;
  let elements = document.querySelectorAll(".product-name");
  let cards = document.querySelectorAll(".card");

  elements.forEach((element, index) => {
    if (element.innerText.includes(searchInput.toUpperCase())) {
      cards[index].classList.remove("hide");
    } else {
      cards[index].classList.add("hide");
    }
  });
});

window.onload = () => {
  filterProduct("all");
};
