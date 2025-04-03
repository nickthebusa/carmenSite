document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.querySelector("#dropdown");
  const options = document.querySelectorAll(".section-dropdown span");
  let selectedService = document.querySelector(".service.selected");

  options.forEach(ele => {
    ele.addEventListener("click", () => {
      selectedService.classList.remove("selected");
      selectedService = document.querySelector(`#${ele.dataset.value}`);
      selectedService.classList.add("selected");
      checkbox.checked = false;
    })
  })
})
