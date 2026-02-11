(function () {
  emailjs.init("4y3HZoMgosQALHU2Y");
})();

const form = document.getElementById("contactForm");

// -----------------------------
// LIMPIEZA
// -----------------------------
function limpiarErrores() {
  document.querySelectorAll(".error-text").forEach(e => e.remove());
  document.querySelectorAll(".error").forEach(e => e.classList.remove("error"));
}

// -----------------------------
// ERROR VISUAL
// -----------------------------
function mostrarError(contenedor, mensaje) {
  contenedor.classList.add("error");

  const error = document.createElement("small");
  error.className = "error-text";
  error.innerText = mensaje;

  // FIELDSET → mensaje debajo
  if (contenedor.tagName === "FIELDSET") {
    contenedor.insertAdjacentElement("afterend", error);
  }
  // FIELD normal → mensaje debajo del input
  else {
    contenedor.appendChild(error);
  }
}


// -----------------------------
// VALIDACIONES
// -----------------------------
function validarFormulario() {
  limpiarErrores();
  let valido = true;
  let primerError = null;

  // INPUTS / TEXTAREAS
  const campos = form.querySelectorAll(".field input[required], .field textarea[required]");
  campos.forEach(campo => {
    if (!campo.value.trim()) {
      const contenedor = campo.closest(".field");
      mostrarError(contenedor, "Este campo es obligatorio");

      if (!primerError) primerError = contenedor;
      valido = false;
    }
  });

  // FIELDSETS REQUERIDOS
  const fieldsets = form.querySelectorAll("fieldset[data-required='true']");
  fieldsets.forEach(fs => {
    const inputs = fs.querySelectorAll("input");
    const algunoSeleccionado = Array.from(inputs).some(i => i.checked);

    if (!algunoSeleccionado) {
      mostrarError(fs, "Este campo es obligatorio");

      if (!primerError) primerError = fs;
      valido = false;
    }
  });

  // ZOOM AL PRIMER ERROR
  if (primerError) {
    const yOffset = -200; // altura header aprox
    const y = primerError.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth"
    });
  }

  return valido;
}

// -----------------------------
// SUBMIT
// -----------------------------
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validarFormulario()) return;

  emailjs.sendForm(
    "service_5ninx6k",
    "template_xeoa1sg",
    this
  )
    .then(() => {
      alert("Consulta enviada correctamente");
      form.reset();
    })
    .catch(() => {
      alert("Error al enviar el formulario");
    });
});
