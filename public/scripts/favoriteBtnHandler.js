const url = "favorites/products"

async function addToFavoriteHandler(ev) {
  const { isUserLogIn, redirectURL } = await checkUserLogIn()

  if (isUserLogIn) {
    window.location.href = redirectURL
    return
  }

  const allBtnProducts = document.querySelectorAll(".bag-btn[data-id]")

  const productId =
    this.closest(".btn--product").querySelector(".bag-btn").dataset.id

  let requestMethod = "POST"

  if (!this.classList.contains("clicked--favorite")) {
    this.classList.add("clicked--favorite")
  } else {
    requestMethod = "DELETE"
    this.classList.remove("clicked--favorite")
  }

  const response = await fetch(url, {
    method: requestMethod,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ProductID: productId,
    }),
  })
}

async function updateFavoriteProducts() {
  const allBtnProducts = [...document.querySelectorAll(".bag-btn[data-id]")]

  const response = await fetch(url, {
    method: "GET",
  })

  if (response.redirected) return

  const allProducts = (await response.json()).result

  allProducts.forEach((product) => {
    const favoriteProductBtn = allBtnProducts.find(
      (btn) => btn.dataset.id == product.ProductID,
    )

    if (favoriteProductBtn)
      favoriteProductBtn.nextElementSibling.firstElementChild.classList.add(
        "clicked--favorite",
      )
  })
}

async function checkUserLogIn() {
  const response = await fetch(url, { method: "GET" })
  return { isUserLogIn: response.redirected, redirectURL: response.url }
}

export { addToFavoriteHandler, updateFavoriteProducts }
