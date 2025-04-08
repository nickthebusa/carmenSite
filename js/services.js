document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.querySelector("#dropdown");
  const menuOptions = document.querySelectorAll(".section-dropdown span");
  const pageOptions = document.querySelectorAll(".pick-service-div");
  const pickServicePage = document.querySelector(".pick-service-page");

  let selectedService = document.querySelector(".service.selected");

  function changeService(serviceId) {
    // remove old selected service
    if (selectedService) {
      selectedService.classList.remove("selected");
    }
    // hide the pick service page
    pickServicePage.style.display = "none";
    // assign selected service
    selectedService = document.querySelector(`#${serviceId}`);
    if (selectedService) {
      selectedService.classList.add("selected");
    }
    checkbox.checked = false;
    // push a new history entry (so back button goes back to pick service page)
    history.pushState(
      { showingDetails: true, serviceId },
      "",
      `?service=${serviceId}`
    );
  }

  menuOptions.forEach(ele => ele.addEventListener("click", () => changeService(ele.dataset.value)));
  pageOptions.forEach(ele => ele.addEventListener("click", () => changeService(ele.dataset.value)));

  window.addEventListener("popstate", (e) => {
    e.preventDefault();

    const state = history.state;

    // check if going back to pick service page
    if (!history.state?.showingDetails) {
      pickServicePage.style.display = "block";
      if (selectedService) {
        selectedService.classList.remove("selected");
      }
      history.replaceState({}, "", "services.html");
    }
  })

  window.addEventListener("load", () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("service")) {
      const serviceId = urlParams.get("service");
      changeService(serviceId);
      history.replaceState(
        { showingDetails: true, serviceId },
        "",
        `?service=${serviceId}`
      );
    } else {
      history.replaceState(
        { showingDetails: false },
        "",
        "services.html"
      );
    }
  })

})
