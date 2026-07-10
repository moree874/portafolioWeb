document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // ABRIR INVITACIÓN
  // =========================

  const botonAbrir = document.getElementById("boton-abrir");
  const apertura = document.getElementById("apertura");
  const contenido = document.getElementById("contenido");

  if (botonAbrir && apertura && contenido) {
    botonAbrir.addEventListener("click", function () {
      apertura.style.display = "none";
      contenido.classList.remove("oculto");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }


  // =========================
  // CUENTA REGRESIVA
  // =========================

  const contador = document.querySelector(".contador");

  const dias = document.getElementById("dias");
  const horas = document.getElementById("horas");
  const minutos = document.getElementById("minutos");
  const segundos = document.getElementById("segundos");

  let intervaloContador;

  function actualizarContador() {
    if (!contador || !dias || !horas || !minutos || !segundos) {
      return;
    }

    const fechaEvento = contador.dataset.fechaEvento;

    if (!fechaEvento) {
      return;
    }

    const evento = new Date(fechaEvento).getTime();
    const ahora = new Date().getTime();
    const diferencia = evento - ahora;

    if (diferencia <= 0) {
      clearInterval(intervaloContador);

      contador.innerHTML = `
        <div class="mensaje-evento">
          <h3>¡Llegó el gran día!</h3>
          <p>Gracias por acompañarnos.</p>
        </div>
      `;

      return;
    }

    const diasRestantes = Math.floor(
      diferencia / (1000 * 60 * 60 * 24)
    );

    const horasRestantes = Math.floor(
      (diferencia / (1000 * 60 * 60)) % 24
    );

    const minutosRestantes = Math.floor(
      (diferencia / (1000 * 60)) % 60
    );

    const segundosRestantes = Math.floor(
      (diferencia / 1000) % 60
    );

    dias.textContent = String(diasRestantes).padStart(2, "0");
    horas.textContent = String(horasRestantes).padStart(2, "0");
    minutos.textContent = String(minutosRestantes).padStart(2, "0");
    segundos.textContent = String(segundosRestantes).padStart(2, "0");
  }

  actualizarContador();

  intervaloContador = setInterval(
    actualizarContador,
    1000
  );


  // =========================
  // ANIMACIONES AL HACER SCROLL
  // =========================

  const elementosRevelar = document.querySelectorAll(".revelar");

  if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            observador.unobserve(entrada.target);
          }
        });
      },
      {
        threshold: 0.14
      }
    );

    elementosRevelar.forEach(function (elemento) {
      observador.observe(elemento);
    });
  } else {
    elementosRevelar.forEach(function (elemento) {
      elemento.classList.add("visible");
    });
  }


  // =========================
  // GALERÍA AMPLIADA
  // =========================

  const fotosGaleria = document.querySelectorAll(".foto-galeria");
  const modalGaleria = document.getElementById("modal-galeria");
  const imagenAmpliada = document.getElementById("imagen-ampliada");
  const cerrarModal = document.getElementById("cerrar-modal");

  function abrirGaleria(rutaImagen, textoAlternativo) {
    if (!modalGaleria || !imagenAmpliada) {
      return;
    }

    imagenAmpliada.src = rutaImagen;
    imagenAmpliada.alt = textoAlternativo || "Fotografía ampliada";

    modalGaleria.classList.add("abierto");
    modalGaleria.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
  }

  function cerrarGaleriaAmpliada() {
    if (!modalGaleria || !imagenAmpliada) {
      return;
    }

    modalGaleria.classList.remove("abierto");
    modalGaleria.setAttribute("aria-hidden", "true");

    imagenAmpliada.src = "";
    document.body.style.overflow = "";
  }

  fotosGaleria.forEach(function (foto) {
    foto.addEventListener("click", function () {
      const rutaImagen = foto.dataset.imagen;
      const imagenInterior = foto.querySelector("img");

      abrirGaleria(
        rutaImagen,
        imagenInterior ? imagenInterior.alt : "Fotografía ampliada"
      );
    });
  });

  if (cerrarModal) {
    cerrarModal.addEventListener(
      "click",
      cerrarGaleriaAmpliada
    );
  }

  if (modalGaleria) {
    modalGaleria.addEventListener("click", function (evento) {
      if (evento.target === modalGaleria) {
        cerrarGaleriaAmpliada();
      }
    });
  }

  document.addEventListener("keydown", function (evento) {
    if (
      evento.key === "Escape" &&
      modalGaleria &&
      modalGaleria.classList.contains("abierto")
    ) {
      cerrarGaleriaAmpliada();
    }
  });


  // =========================
  // MOSTRAR U OCULTAR CANTIDAD
  // =========================

  const asistencia = document.getElementById("asistencia");
  const grupoCantidad = document.getElementById("grupo-cantidad");
  const cantidad = document.getElementById("cantidad");

  function actualizarCantidad() {
    if (!asistencia || !grupoCantidad || !cantidad) {
      return;
    }

    const vaAAsistir =
      asistencia.value === "Sí, voy a asistir";

    grupoCantidad.style.display = vaAAsistir
      ? "block"
      : "none";

    cantidad.required = vaAAsistir;
  }

  if (asistencia) {
    asistencia.addEventListener(
      "change",
      actualizarCantidad
    );

    actualizarCantidad();
  }


  // =========================
  // FORMULARIO DE CONFIRMACIÓN
  // =========================

  const formularioConfirmacion =
    document.getElementById("formulario-confirmacion");

  if (formularioConfirmacion) {
    formularioConfirmacion.addEventListener(
      "submit",
      function (evento) {
        evento.preventDefault();

        const nombre = document
          .getElementById("nombre")
          .value
          .trim();

        const respuestaAsistencia =
          document.getElementById("asistencia").value;

        const cantidadPersonas =
          document.getElementById("cantidad").value;

        const mensajeOpcional = document
          .getElementById("mensaje")
          .value
          .trim();

        if (!nombre || !respuestaAsistencia) {
          alert("Completá tu nombre y la asistencia.");
          return;
        }

        let mensaje =
          "Hola, quiero confirmar mi asistencia al cumpleaños de Martina.%0A%0A" +
          `Nombre: ${encodeURIComponent(nombre)}%0A` +
          `Asistencia: ${encodeURIComponent(respuestaAsistencia)}%0A`;

        if (
          respuestaAsistencia === "Sí, voy a asistir"
        ) {
          mensaje +=
            `Cantidad de personas: ${encodeURIComponent(cantidadPersonas)}%0A`;
        }

        if (mensajeOpcional) {
          mensaje +=
            `Mensaje: ${encodeURIComponent(mensajeOpcional)}%0A`;
        }

        window.open(
          `https://wa.me/5492634475711?text=${mensaje}`,
          "_blank"
        );
      }
    );
  }

});