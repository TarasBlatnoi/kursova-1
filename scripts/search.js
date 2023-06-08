let products = {
  data: [
    {
      productName: "Nike Invincible",
      category: "Дорожній",
      price: "78",
      image: "images/Shoes1.png",
    },

    {
      productName: "Nike Phantom GX Club TF",
      category: "Щоденний",
      price: "64",
      image: "images/Shoes2.png",
    },

    {
      productName: "Nike Air Force LX",
      category: "Щоденний",
      price: "81",
      image: "images/Shoes3.png",
    },
    {
      productName: "Zion 2 PF",
      category: "Щоденний",
      price: "94",
      image: "images/Shoes4.png",
    },
    {
      productName: "Nike Dunk Low Disrupt 2",
      category: "Дорожній",
      price: "73",
      image: "images/Shoes5.png",
    },
    {
      productName: "Jordan Play",
      category: "Щоденний",
      price: "46",
      image: "images/Shoes6.png",
    },
    {
      productName: "Nike Kiger 9",
      category: "Дорожній",
      price: "89",
      image: "images/Shoes7.png",
    },
  ],
};

for (let i of products.data) {
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
}

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
