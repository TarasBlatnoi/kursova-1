document.addEventListener("DOMContentLoaded", function () {
  const user = localStorage.getItem("user")
  //changes
  if (user) {
    console.log("User is logged in")
    return
  } else {
    console.log("User is not logged in")
  }

  fetch("/api/v1/user")
    .then((response) => {
      if (response.ok) {
        return response.json() // Parse response as JSON
      } else {
        throw new Error("Failed to fetch user data")
      }
    })
    .then((userData) => {
      localStorage.setItem("user", JSON.stringify(userData)) // Store user data in local storage
    })
    .catch((error) => {
      console.error("Error fetching user data:", error)
    })
})
