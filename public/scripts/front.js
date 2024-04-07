//Catalog

//Сountdown timer
const endDate = new Date("2024-12-30T00:00:00");

function updateCountdown() {
  const now = new Date();

  const timeDiff = endDate - now;

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  const countdownText = `До кінця розпродажу ${days}д. ${hours}год. ${minutes}хв. ${seconds}сек. Дізнатись більше`;

  document.getElementById("countdown").textContent = countdownText;

  if (timeDiff < 0) {
    clearInterval(timer);
    document.getElementById("countdown").textContent = "Розпродаж закінчена";
  }
}
updateCountdown();
const timer = setInterval(updateCountdown, 1000);

//SortingButton

const dropdown = document.querySelectorAll(".Sorting-dropdown");
dropdown.forEach((dropdown) => {
  const select = dropdown.querySelector(".select");
  const caret = dropdown.querySelector(".caret");
  const menu = dropdown.querySelector(".menu");
  const options = dropdown.querySelector(".menu li");
  const selected = dropdown.querySelector(".selected");

  select.addEventListener("click", () => {
    caret.classList.toggle("caret-rotate");

    menu.classList.toggle("menu-open");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      selected.innerText = option.innerText;
      select.classList.remove("select-clicked");
      caret.classList.remove("caret-rotate");
      menu.classList.remove("menu-open");
    });
  });
});
