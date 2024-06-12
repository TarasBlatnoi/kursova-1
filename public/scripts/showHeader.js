export default function showHeader() {
  const navbar = document.querySelector(".navbar-interactive")
  const ul = document.querySelector(".ul-navbar-small")

  ul.addEventListener("mouseover", function () {
    navbar.classList.remove("animated-hide")
    navbar.classList.add("animated-show")
    navbar.style.display = "flex"
    console.log("mouseover")
  })
  ul.addEventListener("mouseout", function (event) {
    const bounds = ul.getBoundingClientRect()
    let mouseX = event.clientX
    const mouseY = event.clientY
    mouseX++
    // Check if the mouse is leaving from the top
    if (mouseY < bounds.top) {
      navbar.classList.remove("animated-show")
      navbar.classList.add("animated-hide")
      ul.style.height = "30%"
    }

    // Check if the mouse is leaving from the sides
    if (mouseX < bounds.left || mouseX > bounds.right) {
      navbar.classList.remove("animated-show")
      navbar.classList.add("animated-hide")
      ul.style.height = "30%"
    }
  })

  navbar.addEventListener("mouseover", function (event) {
    ul.style.height = "100%"
  })
  navbar.addEventListener("mouseout", function (event) {
    navbar.classList.remove("animated-show")
    navbar.classList.add("animated-hide")
    ul.style.height = "30%"
  })
}
