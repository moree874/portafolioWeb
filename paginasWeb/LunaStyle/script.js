document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // MENÚ PARA CELULAR
  // =========================

  const botonMenu = document.getElementById("boton-menu");
  const navegacion = document.getElementById("navegacion");

  if (botonMenu && navegacion) {

    botonMenu.addEventListener("click", function () {

      const abierto = navegacion.classList.toggle("abierta");

      botonMenu.setAttribute(
        "aria-expanded",
        String(abierto)
      );

      botonMenu.textContent = abierto ? "✕" : "☰";

    });


    navegacion.querySelectorAll("a").forEach(function (enlace) {

      enlace.addEventListener("click", function () {

        navegacion.classList.remove("abierta");

        botonMenu.setAttribute(
          "aria-expanded",
          "false"
        );

        botonMenu.textContent = "☰";

      });

    });

  }


  // =========================
  // ANIMACIONES AL HACER SCROLL
  // =========================

  const elementosRevelar =
    document.querySelectorAll(".revelar");

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


  // =========================
  // BOTONES DE SERVICIOS
  // =========================

  const botonesReservar =
    document.querySelectorAll(".boton-reservar");

  const campoServicio =
    document.getElementById("servicio");

  const seccionTurnos =
    document.getElementById("turnos");

  botonesReservar.forEach(function (boton) {

    boton.addEventListener("click", function () {

      const servicioElegido =
        boton.dataset.servicio;

      campoServicio.value =
        servicioElegido;

      seccionTurnos.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  // =========================
  // FORMULARIO DE TURNOS
  // =========================

  const formularioTurno =
    document.getElementById("formulario-turno");

  if (formularioTurno) {

    formularioTurno.addEventListener(
      "submit",
      function (evento) {

        evento.preventDefault();

        const nombre =
          document.getElementById("nombre").value.trim();

        const servicio =
          document.getElementById("servicio").value;

        const fecha =
          document.getElementById("fecha").value;

        const hora =
          document.getElementById("hora").value;

        if (!nombre || !servicio || !fecha || !hora) {
          alert("Completá todos los datos para reservar.");
          return;
        }

        const fechaFormateada =
          new Date(fecha + "T00:00:00")
            .toLocaleDateString("es-AR");

        const mensaje =
          `Hola, quiero reservar un turno en Luna Style.%0A%0A` +
          `Nombre: ${encodeURIComponent(nombre)}%0A` +
          `Servicio: ${encodeURIComponent(servicio)}%0A` +
          `Fecha: ${encodeURIComponent(fechaFormateada)}%0A` +
          `Hora: ${encodeURIComponent(hora)}`;

        window.open(
          `https://wa.me/5492634475711?text=${mensaje}`,
          "_blank"
        );

      }
    );

  }


  // =========================
  // EVITAR FECHAS ANTERIORES
  // =========================

  const campoFecha =
    document.getElementById("fecha");

  if (campoFecha) {

    const hoy = new Date();

    const anio = hoy.getFullYear();

    const mes =
      String(hoy.getMonth() + 1).padStart(2, "0");

    const dia =
      String(hoy.getDate()).padStart(2, "0");

    campoFecha.min =
      `${anio}-${mes}-${dia}`;

  }


  // =========================
  // GALERÍA AMPLIADA
  // =========================

  const fotosGaleria =
    document.querySelectorAll(".foto-galeria");

  const modalGaleria =
    document.getElementById("modal-galeria");

  const imagenAmpliada =
    document.getElementById("imagen-ampliada");

  const cerrarModal =
    document.getElementById("cerrar-modal");

  function abrirModal(rutaImagen) {

    imagenAmpliada.src = rutaImagen;

    modalGaleria.classList.add("abierto");

    modalGaleria.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow = "hidden";

  }

  function cerrarGaleria() {

    modalGaleria.classList.remove("abierto");

    modalGaleria.setAttribute(
      "aria-hidden",
      "true"
    );

    imagenAmpliada.src = "";

    document.body.style.overflow = "";

  }

  fotosGaleria.forEach(function (foto) {

    foto.addEventListener("click", function () {

      abrirModal(foto.dataset.imagen);

    });

  });

  if (cerrarModal) {

    cerrarModal.addEventListener(
      "click",
      cerrarGaleria
    );

  }

  if (modalGaleria) {

    modalGaleria.addEventListener(
      "click",
      function (evento) {

        if (evento.target === modalGaleria) {
          cerrarGaleria();
        }

      }
    );

  }

  document.addEventListener(
    "keydown",
    function (evento) {

      if (
        evento.key === "Escape" &&
        modalGaleria.classList.contains("abierto")
      ) {
        cerrarGaleria();
      }

    }
  );

});