export default function updateCountdownWrapper() {
  const endDate = new Date("2026-06-30T00:00:00")

  function updateCountdown() {
    const now = new Date()

    const timeDiff = endDate - now

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

    const countdownText = `До кінця розпродажу ${days}д. ${hours}год. ${minutes}хв. ${seconds}сек. Дізнатись більше`

    document.getElementById("countdown").textContent = countdownText

    if (timeDiff < 0) {
      clearInterval(timer)
      document.getElementById("countdown").textContent = "Розпродаж закінчена"
    }
  }
  updateCountdown()
  const timer = setInterval(updateCountdown, 1000)
}
