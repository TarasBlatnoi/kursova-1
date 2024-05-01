export default function showHeader() {
  const navbar = document.querySelector(".navbar-interactive")
  const ul = document.querySelector(".ul-navbar-small")

  ul.addEventListener("mouseover", function () {
    navbar.classList.remove("animated-hide")
    navbar.classList.add("animated-show")
    navbar.style.display = "flex"
  })
  ul.addEventListener("mouseout", function (event) {
    const bounds = ul.getBoundingClientRect()
    const mouseX = event.clientX
    const mouseY = event.clientY

    // Check if the mouse is leaving from the top
    if (mouseY < bounds.top) {
      navbar.classList.remove("animated-show")
      navbar.classList.add("animated-hide")
    }

    // Check if the mouse is leaving from the sides
    if (mouseX < bounds.left || mouseX > bounds.right) {
      navbar.classList.remove("animated-show")
      navbar.classList.add("animated-hide")
    }
  })

  navbar.addEventListener("mouseout", function (event) {
    const relatedTarget = event.relatedTarget
    if (!navbar.contains(relatedTarget)) {
      navbar.classList.remove("animated-show")
      navbar.classList.add("animated-hide")
    }
  })
}
