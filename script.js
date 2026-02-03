(function () {
  emailjs.init("4y3HZoMgosQALHU2Y");
})();

const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");

function validarHorarios() {
  const horarios = document.querySelectorAll('input[name="horario"]');
  return Array.from(horarios).some(h => h.checked);
}

function validarFormulario() {
  const htmlValido = form.checkValidity();
  const horarioValido = validarHorarios();

  submitBtn.disabled = !(htmlValido && horarioValido);
}

form.addEventListener("input", validarFormulario);
form.addEventListener("change", validarFormulario);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_5ninx6k",
    "template_xeoa1sg",
    this
  )
  .then(() => {
    alert("Consulta enviada correctamente");
    form.reset();
    submitBtn.disabled = true;
  })
  .catch(() => {
    alert("Error al enviar el formulario");
  });
});
