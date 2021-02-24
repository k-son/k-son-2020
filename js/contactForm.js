function testText(field, lng) {
  return field.value.length >= lng;
}
  
function testEmail(field) {
  const reg = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/;
  return reg.test(field.value);
};
  
function markFieldAsError(field, show) {
  if (show) {
      field.classList.add("field-error");
  } else {
      field.classList.remove("field-error");
  }
};



//------------------------
//pobieram elementy
//------------------------
const form = document.querySelector("#contactForm");
const inputName = form.querySelector("input[name=name]");
const inputEmail = form.querySelector("input[name=email]");
const formMessage = form.querySelector(".form__textarea");


//------------------------
//etap 1 : podpinam eventy
//------------------------
inputName.addEventListener("input", e => markFieldAsError(e.target, !testText(e.target)));
inputEmail.addEventListener("input", e => markFieldAsError(e.target, !testEmail(e.target)));


form.addEventListener("submit", e => {
  e.preventDefault();

  let formErrors = [];

  //------------------------
  //2 etap - sprawdzamy poszczególne pola gdy ktoś chce wysłać formularz
  //------------------------

  //chowam błędy
  for (const el of [inputName, inputEmail]) {
      markErrorField(el, false);
  }

  //i testuję w razie czego zaznaczając pola
  if (!testText(inputName, 3)) {
      markFieldAsError(inputName, true);
      formErrors.push("Wypełnij poprawnie pole z imieniem");
  }

  if (!testEmail(inputEmail)) {
      markFieldAsError(inputEmail, true);
      formErrors.push("Wypełnij poprawnie pole z emailem");
  }

  if (!formErrors.length) { //jeżeli nie ma błędów wysyłamy formularz
      form.submit();
      //...lub dynamicznie wysyłamy dane za pomocą Ajax
      //równocześnie reagując na odpowiedź z serwera
  } else {
      //jeżeli jednak są jakieś błędy...
      formMessage.innerHTML = `
          <h3 class="form-error-title">Przed wysłaniem formularza proszę poprawić błędy:</h3>
          <ul class="form-error-list">
              ${formErrors.map(el => `<li>${el}</li>`).join("")}
          </ul>
      `;
  }
});


/* *********** */

function removeFieldError(field) {
  const errorText = field.nextElementSibling;
  if (errorText !== null) {
      if (errorText.classList.contains("form-error-text")) {
          errorText.remove();
      }
  }
};

function createFieldError(field, text) {
  removeFieldError(field); //przed stworzeniem usuwam by zawsze był najnowszy komunikat

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
          errorText.setAttribute('aria-hidden', show);
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

//pobieram elementy
const inputs = form.querySelectorAll("[required]");

form.setAttribute("novalidate", true);

//etap 1 : podpinam eventy
for (const el of inputs) {
  el.addEventListener("input", e => markFieldAsError(e.target, !e.target.checkValidity()));
}

form.addEventListener("submit", e => {
  e.preventDefault();

  let formErrors = false;

  //2 etap - sprawdzamy poszczególne pola gdy ktoś chce wysłać formularz
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
                const div = document.createElement("div");
                div.classList.add("form-send-success");
                div.innerText = "Wysłanie wiadomości się nie powiodło";

                form.parentElement.insertBefore(div, form);
                div.innerHTML = `
                    <strong>Wiadomość została wysłana</strong>
                    <span>Dziękujemy za kontakt. Postaramy się odpowiedzieć jak najszybciej</span>
                `;
                form.remove();
            }
            if (res.status === "error") {
                //jeżeli istnieje komunikat o błędzie wysyłki
                //np. generowany przy poprzednim wysyłaniu formularza
                //usuwamy go, by nie duplikować tych komunikatów
                const statusError = document.querySelector(".form-send-error");
                if (statusError) {
                    statusError.remove();
                }

                const div = document.createElement("div");
                div.classList.add("form-send-error");
                div.innerText = "Wysłanie wiadomości się nie powiodło";
                submit.parentElement.appendChild(div);
            }
        }
    }).finally(() => {
        submit.disabled = false;
        submit.classList.remove("loading");
    });
  }
});


