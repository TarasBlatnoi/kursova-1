//Catalog

//Hide-Filter

const HideFilter = document.querySelectorAll(".Hide-Filter");
HideFilter.forEach((HideFilter) => {
  const selectHide = HideFilter.querySelector(".Select-Hide");
  const icon = HideFilter.querySelector(".icon-filter");
  selectHide.addEventListener("click", () => {
    icon.classList.toggle("icon-filter-rotate");
  });
});

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
