const URL_SHEETS = "https://script.google.com/macros/s/AKfycbxcdV9Zdg4FL2q1llc5vKVMjLa4BP9JtVD4MESOzpmex28uZ8rL9r0jooFjQDWAzzI9bQ/exec";

document.addEventListener("DOMContentLoaded", function () {
  const portada = document.querySelector(".portada");
  const contenido = document.getElementById("contenido");
  const musica = document.getElementById("musica");

  window.abrirInvitacion = function () {
    if (musica) {
      musica.play().catch(() => {
        console.log("El navegador bloqueó la música.");
      });
    }

    portada.style.display = "none";
    contenido.classList.remove("oculto");
  };

  const fechaFiesta = new Date("2026-08-15T21:30:00").getTime();

  function actualizarContador() {
    const ahora = new Date().getTime();
    const diferencia = fechaFiesta - ahora;

    if (diferencia <= 0) {
      document.querySelector(".contador").innerHTML = "<h3>¡Llegó el gran día!</h3>";
      return;
    }

    document.getElementById("dias").textContent = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    document.getElementById("horas").textContent = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    document.getElementById("minutos").textContent = Math.floor((diferencia / (1000 * 60)) % 60);
    document.getElementById("segundos").textContent = Math.floor((diferencia / 1000) % 60);
  }

  setInterval(actualizarContador, 1000);
  actualizarContador();

  const formulario = document.getElementById("formulario");
  const integrantesDiv = document.getElementById("integrantes");

  if (formulario && integrantesDiv) {
    const cupos = Number(formulario.dataset.cupos);

    integrantesDiv.innerHTML = "";

    for (let i = 1; i <= cupos; i++) {
      integrantesDiv.innerHTML += `
        <div class="integrante">
          <h3>Integrante ${i}</h3>

          <input type="text" id="nombre${i}" placeholder="Nombre" required>

          <select id="menu${i}" required>
            <option value="">Menú</option>
            <option value="Tradicional">Tradicional</option>
            <option value="Vegetariano">Vegetariano</option>
            <option value="Vegano">Vegano</option>
            <option value="Celíaco">Celíaco</option>
          </select>

          <input type="text" id="restriccion${i}" placeholder="Restricción alimentaria (opcional)">
        </div>
      `;
    }

    formulario.addEventListener("submit", function (e) {
      e.preventDefault();

      const familia = document.getElementById("familia").value;

      const integrantes = [];

      for (let i = 1; i <= cupos; i++) {
        integrantes.push({
          numero: i,
          nombre: document.getElementById(`nombre${i}`).value,
          menu: document.getElementById(`menu${i}`).value,
          restriccion: document.getElementById(`restriccion${i}`).value || "Ninguna"
        });
      }

      const datos = {
        invitacion: `Invitación de ${cupos} persona(s)`,
        cupos: cupos,
        familia: familia,
        integrantes: integrantes
      };

      fetch(URL_SHEETS, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
      });

      lanzarConfeti();

      const boton = formulario.querySelector("button[type='submit']");
      boton.textContent = "Asistencia confirmada";
      boton.disabled = true;

      mostrarMensajeConfirmacion();
    });
  }
});

function mostrarMensajeConfirmacion() {
  const mensaje = document.createElement("div");
  mensaje.classList.add("mensaje-confirmacion");

  mensaje.innerHTML = `
    <div class="mensaje-caja">
      <h2>¡Gracias! 🎉</h2>
      <p>Tu asistencia fue confirmada correctamente.</p>
      <p>Nos vemos el <strong>15 de agosto ❤️</strong></p>
      <button class="cerrar-mensaje">Cerrar ✕</button>
    </div>
  `;

  document.body.appendChild(mensaje);

  mensaje.querySelector(".cerrar-mensaje").addEventListener("click", function () {
    mensaje.remove();
  });
}

function lanzarConfeti() {
  const colores = ["#ffffff", "#e8e8e8", "#cfcfcf", "#f7f7f7"];

  for (let i = 0; i < 120; i++) {
    const confeti = document.createElement("div");
    confeti.classList.add("confeti");

    confeti.style.left = Math.random() * 100 + "vw";
    confeti.style.background = colores[Math.floor(Math.random() * colores.length)];
    confeti.style.animationDuration = Math.random() * 2 + 2 + "s";

    document.body.appendChild(confeti);

    setTimeout(() => {
      confeti.remove();
    }, 4000);
  }
}