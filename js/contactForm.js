const form = document.querySelector("#contactForm");
const submitBtn = form.querySelector("[type=submit]");
const inputName = form.querySelector("input[name=name]");
const inputEmail = form.querySelector("input[name=email]");
const inputMessage = form.querySelector("textarea");
const inputsRequired = form.querySelectorAll("[required]");
const formInfoBox = document.querySelector(".form__info-box")
const formInfoText = document.querySelector(".form__info-text");
const formErrorBox = document.querySelector(".form__error-box");
const formErrorText = document.querySelector(".form__error-text");


function testText(field, lng) {
  return field.value.length >= lng;
}
  
function testEmail(field) {
  const reg = /[^@\s]+@[^@\s]+\.[^@\s]+/;
  return reg.test(field.value);
};
  
function markFieldAsError(field, show) {
  if (show) {
    field.classList.add("field-error");
  } else {
    field.classList.remove("field-error");
  }
};


// wyłączamy walidacje html
form.setAttribute("novalidate", true);

// podpinamy eventy
for (const el of inputsRequired) {
  el.addEventListener("input", e => markFieldAsError(e.target, !e.target.checkValidity()));
}


/* Submit */
form.addEventListener("submit", e => {
  e.preventDefault();

  // chowamy stare błędy przed ponownym ich sprawdzeniem
  for (const el of inputsRequired) {
    markFieldAsError(el, false);
  }

  // zaznaczamy inputy jeśli nie są wypełnione poprawnie i zbieramy wiadomości do wyświetlenia
  let formErrors = [];

  if (!inputName.checkValidity()) {
    markFieldAsError(inputName, true);
    formErrors.push("Your name must contain at least 2 characters.");
  }

  if (!inputEmail.checkValidity()) {
    markFieldAsError(inputEmail, true);
    formErrors.push("Please fill in the e-mail field correctly.");
  }

  if (!inputMessage.checkValidity()) {
    markFieldAsError(inputMessage, true);
    formErrors.push("Your must include a message.");
  }

  // jeżeli nie ma błędów walidacji
  if (!formErrors.length) {

    // wyłączamy na chwilę submit button
    submitBtn.disabled = true;
    submitBtn.classList.add("loading");

    // zbieramy dane z formularza
    const formData = new FormData(form);
    const url = form.getAttribute("action");
    const method = form.getAttribute("method");

    // wysyłamy
    fetch(url, {
      method: method.toUpperCase(),
      body: formData
    })
    .then(res => res.json())
    .then(res => {
      // tu jeszcze errory z serwera dopisac  if(res.errors) / else
      {
        if (res.status === "ok") {
          formInfoText.textContent = "Your message has been sent. Thank you!"
          formInfoBox.classList.remove("hidden");
          formErrorBox.classList.add("hidden"); 
        }
        if (res.status === "error") {
          formErrorText.textContent = "Sorry, sending the message has failed. Try again later or mail to kson.eu@gmail.com."
          formErrorBox.classList.remove("hidden");
          formInfoBox.classList.add("hidden"); 
        }
      }
    })
    .catch(error => {
      console.log("Error: ", error);
      formErrorText.textContent = "Sorry, sending the message has failed. Try again later or mail to kson.eu@gmail.com."
      formErrorBox.classList.remove("hidden");
      formInfoBox.classList.add("hidden"); 
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.classList.remove("loading");
    });

  } else {
    formErrorBox.innerHTML = `
    <h3 class="form-error-title">Please correct the following errors before submitting the form:</h3>
    <ul class="form-error-list">
      ${formErrors.map(el => "<li>" + el + "</li>").join("")}
    </ul>
    `;
    formErrorBox.classList.remove("hidden");
    formInfoBox.classList.add("hidden");
  }
});