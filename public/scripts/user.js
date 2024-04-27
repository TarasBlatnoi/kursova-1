export default function userWrapper() {
  document.addEventListener("DOMContentLoaded", function () {
    const user = localStorage.getItem("user")

    if (user) {
      console.log("User is logged in")
      return
    } else {
      console.log("User is not logged in")
      fetch("/api/v1/checkUser")
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error("Failed to fetch user data")
          }
        })
        .then((userData) => {
          console.log(userData)
          localStorage.setItem("user", JSON.stringify(userData))
        })
        .catch((error) => {
          console.error("Error fetching user data:", error)
        })
    }
  })
}
