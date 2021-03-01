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


// pobieramy elementy
//------------------------
const form = document.querySelector("#contactForm");
const formInput = form.querySelectorAll("input");
const inputName = form.querySelector("input[name=name]");
const inputEmail = form.querySelector("input[name=email]");
const formMessage = document.querySelector(".form__textarea");
const formInfoBox = document.querySelector(".form__info-box")
const formInfoText = document.querySelector(".form__info-text");
const formErrorBox = document.querySelector(".form__error-box");
const formErrorText = document.querySelector(".form__error-text");


// podpinamy eventy
//------------------------
inputName.addEventListener("input", e => markFieldAsError(e.target, !testText(e.target)));
inputEmail.addEventListener("input", e => markFieldAsError(e.target, !testEmail(e.target)));
formMessage.addEventListener("input", e => markFieldAsError(e.target, !testText(e.target)));


form.addEventListener("submit", e => {
  e.preventDefault();

  let formErrors = [];

  // sprawdzamy poszczególne pola, gdy ktoś chce wysłać formularz
  //------------------------

  // chowamy błędy
  for (const el of [inputName, inputEmail, formMessage]) {
    markFieldAsError(el, false);
  }

  // zaznaczamy inputy jeśli nie są wypełnione poprawnie
  if (!testText(inputName, 2)) {
    markFieldAsError(inputName, true);
    formErrors.push("Your name must contain at least 2 characters.");
  }

  if (!testEmail(inputEmail)) {
    markFieldAsError(inputEmail, true);
    formErrors.push("Please fill in the e-mail field correctly.");
  }

  if (!testText(formMessage, 1)) {
    markFieldAsError(inputName, true);
    formErrors.push("Your must include a message.");
  }


  // jeżeli nie ma błędów wysyłamy formularz
  if (!formErrors.length) { 
    form.submit();

    // równocześnie reagując na odpowiedź z serwera
  } else {

    //jeżeli jednak są jakieś błędy...
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



function removeFieldError(field) {
  const errorText = field.nextElementSibling;
  if (errorText !== null) {
    if (errorText.classList.contains("form-error-text")) {
      errorText.remove();
    }
  }
};

function createFieldError(field, text) {
  removeFieldError(field); //przed stworzeniem usuwamy, by zawsze był najnowszy komunikat

  const div = document.createElement("div");
  div.classList.add("form-error-text");
  div.innerText = text;
  if (field.nextElementSibling === null) {
    field.parentElement.appendChild(div);
  } else {
    if (!field.nextElementSibling.classList.contains("form-error-text")) {
      field.parentElement.insertBefore(div, field.nextElementSibling);
    }
  }
};

function toggleErrorField(field, show) {
  const errorText = field.nextElementSibling;
  if (errorText !== null) {
    if (errorText.classList.contains("form-error-text")) {
      errorText.style.display = show ? "block" : "none";
      errorText.setAttribute("aria-hidden", show);
    }
  }
};

function markFieldAsError(field, show) {
  if (show) {
    field.classList.add("field-error");
  } else {
    field.classList.remove("field-error");
    toggleErrorField(field, false);
  }
};


// pobieramy elementy
const inputs = form.querySelectorAll("[required]");

form.setAttribute("novalidate", true);

// etap 1 : podpinam eventy
for (const el of inputs) {
  el.addEventListener("input", e => markFieldAsError(e.target, !e.target.checkValidity()));
}

form.addEventListener("submit", e => {
  e.preventDefault();

  let formErrors = false;

  // 2 etap - sprawdzamy poszczególne pola gdy ktoś chce wysłać formularz
  for (const el of inputs) {
    markFieldAsError(el, false);
    toggleErrorField(el, false);

    if (!el.checkValidity()) {
      markFieldAsError(el, true);
      toggleErrorField(el, true);
      formErrors = true;
    }
  }

  if (!formErrors) {
    const submit = form.querySelector("[type=submit]");
    submit.disabled = true;
    submit.classList.add("loading");

    const formData = new FormData(form);
    const url = form.getAttribute("action");
    const method = form.getAttribute("method");

    fetch(url, {
      method: method.toUpperCase(),
      body: formData
    })
    .then(res => res.json())
    .then(res => {
      if (res.errors) {
        const selectors = res.errors.map(el => `[name="${el}"]`);
        const fieldsWithErrors = form.querySelectorAll(selectors.join(","));
        for (const el of fieldsWithErrors) {
          markFieldAsError(el, true);
          toggleErrorField(el, true);
        }
        } else {
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
    }).finally(() => {
      submit.disabled = false;
      submit.classList.remove("loading");
    });
  }
});