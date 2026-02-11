const modal = document.getElementById("modalCompra");
const cerrarModalBtn = document.getElementById("cerrarModal");
const productoInput = document.getElementById("productoSeleccionado");

// Abrir modal
document.querySelectorAll(".btn-comprar").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".recurso-card");
    const content = card.querySelector(".recurso-content");

    const tipo = content.dataset.type;

    // RECURSO GRATUITO
    if (tipo === "free") {
      const archivo = content.dataset.file;

      const link = document.createElement("a");
      link.href = archivo;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return;
    }

    // RECURSO PAGO
    const titulo = content.querySelector("h2").innerText;
    productoInput.value = titulo;
    modal.classList.add("active");
  });
});



// Cerrar modal
cerrarModalBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

// Cerrar al hacer click afuera
modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

// Submit (por ahora solo validamos)
document.getElementById("formCompra").addEventListener("submit", e => {
  e.preventDefault();

  const email = e.target.email.value;
  const emailConfirm = e.target.emailConfirmacion.value;

  if (email !== emailConfirm) {
    alert("Los emails no coinciden");
    return;
  }

  alert("Datos correctos ✔️ Próximo paso: pago");
});
