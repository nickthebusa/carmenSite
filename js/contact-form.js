document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('contact-form');
  const result = document.getElementById('result');
  const loader = document.querySelector(".loader-overlay");

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const services = formData.getAll("services");
    const object = Object.fromEntries(
      [...formData].filter(([name]) => name !== "services")
    );
    object.services = services;
    console.log(object);
    const json = JSON.stringify(object);
    result.innerHTML = "Please wait...";
    loader.style.display = "flex";
    form.disabled = true;

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json,
    })
      .then(async (response) => {
        let json = await response.json();
        loader.style.display = "none";
        form.disabled = false;
        if (response.status == 200) {
          result.innerHTML = "Form submitted successfully";
        } else {
          console.log(response);
          result.innerHTML = json.message;
        }
      })
      .catch(error => {
        console.log(error);
        loader.style.display = "none";
        result.innerHTML = "Something went wrong!";
        form.disabled = false;
      })
      .then(function() {
        form.reset();
        setTimeout(() => {
          result.style.display = "none";
        }, 3000);
      });
  });
})
