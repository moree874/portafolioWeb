document.addEventListener("DOMContentLoaded", function () {

  // =====================================
  // ELEMENTOS PRINCIPALES
  // =====================================

  const botonAbrir = document.getElementById("abrir-invitacion");
  const pantallaSobre = document.getElementById("sobre-pantalla");
  const contenido = document.getElementById("contenido");

  const musica = document.getElementById("musica");
  const botonMusica = document.getElementById("boton-musica");

  const slides = document.querySelectorAll(".slide");

  let slideActual = 0;
  let intervaloSlider = null;
  let musicaActiva = false;


  // =====================================
  // ABRIR SOBRE E INVITACIÓN
  // =====================================

  if (botonAbrir && pantallaSobre && contenido) {

    botonAbrir.addEventListener("click", function () {

      pantallaSobre.classList.add("abriendo");

      setTimeout(function () {

        pantallaSobre.style.display = "none";
        contenido.classList.remove("oculto");

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

        iniciarSlider();
        reproducirMusica();

      }, 1100);

    });

  }


  // =====================================
  // SLIDER AUTOMÁTICO DE PORTADA
  // =====================================

  function mostrarSlide(indice) {

    slides.forEach(function (slide) {
      slide.classList.remove("activo");
    });

    if (slides[indice]) {
      slides[indice].classList.add("activo");
    }

  }

  function siguienteSlide() {

    if (slides.length === 0) {
      return;
    }

    slideActual = (slideActual + 1) % slides.length;

    mostrarSlide(slideActual);

  }

  function iniciarSlider() {

    if (slides.length <= 1 || intervaloSlider) {
      return;
    }

    mostrarSlide(slideActual);

    intervaloSlider = setInterval(
      siguienteSlide,
      5000
    );

  }


  // =====================================
  // MÚSICA
  // =====================================

  function reproducirMusica() {

    if (!musica) {
      return;
    }

    musica.volume = 0.55;

    const promesa = musica.play();

    if (promesa !== undefined) {

      promesa
        .then(function () {

          musicaActiva = true;

          if (botonMusica) {
            botonMusica.classList.add("reproduciendo");
            botonMusica.textContent = "❚❚";
          }

        })
        .catch(function () {

          musicaActiva = false;

          if (botonMusica) {
            botonMusica.textContent = "♫";
          }

        });

    }

  }

  function pausarMusica() {

    if (!musica) {
      return;
    }

    musica.pause();
    musicaActiva = false;

    if (botonMusica) {
      botonMusica.classList.remove("reproduciendo");
      botonMusica.textContent = "♫";
    }

  }

  if (botonMusica) {

    botonMusica.addEventListener("click", function () {

      if (musicaActiva) {
        pausarMusica();
      } else {
        reproducirMusica();
      }

    });

  }


  // =====================================
  // CUENTA REGRESIVA
  // =====================================

  const contador = document.querySelector(".contador");

  const dias = document.getElementById("dias");
  const horas = document.getElementById("horas");
  const minutos = document.getElementById("minutos");
  const segundos = document.getElementById("segundos");

  let intervaloContador;

  function actualizarContador() {

    if (
      !contador ||
      !dias ||
      !horas ||
      !minutos ||
      !segundos
    ) {
      return;
    }

    const fechaTexto = contador.dataset.fecha;

    if (!fechaTexto) {
      return;
    }

    const fechaEvento = new Date(fechaTexto).getTime();
    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;

    if (diferencia <= 0) {

      clearInterval(intervaloContador);

      dias.textContent = "00";
      horas.textContent = "00";
      minutos.textContent = "00";
      segundos.textContent = "00";

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

    dias.textContent =
      String(diasRestantes).padStart(2, "0");

    horas.textContent =
      String(horasRestantes).padStart(2, "0");

    minutos.textContent =
      String(minutosRestantes).padStart(2, "0");

    segundos.textContent =
      String(segundosRestantes).padStart(2, "0");

  }

  actualizarContador();

  intervaloContador = setInterval(
    actualizarContador,
    1000
  );


  // =====================================
  // ANIMACIONES AL HACER SCROLL
  // =====================================

  const elementosRevelar =
    document.querySelectorAll(".revelar");

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


  // =====================================
  // MODAL DE REGALOS
  // =====================================

  const botonAbrirRegalo =
    document.getElementById("abrir-regalo");

  const modalRegalo =
    document.getElementById("modal-regalo");

  if (botonAbrirRegalo && modalRegalo) {

    botonAbrirRegalo.addEventListener(
      "click",
      function () {

        modalRegalo.classList.add("abierto");

        modalRegalo.setAttribute(
          "aria-hidden",
          "false"
        );

        document.body.style.overflow = "hidden";

      }
    );

  }


  // =====================================
  // COPIAR ALIAS
  // =====================================

  const botonCopiarAlias =
    document.getElementById("copiar-alias");

  const alias =
    document.getElementById("alias");

  if (botonCopiarAlias && alias) {

    botonCopiarAlias.addEventListener(
      "click",
      async function () {

        const textoAlias =
          alias.textContent.trim();

        try {

          await navigator.clipboard.writeText(textoAlias);

          botonCopiarAlias.textContent =
            "Alias copiado";

          setTimeout(function () {

            botonCopiarAlias.textContent =
              "Copiar alias";

          }, 1800);

        } catch (error) {

          const auxiliar =
            document.createElement("textarea");

          auxiliar.value = textoAlias;
          document.body.appendChild(auxiliar);
          auxiliar.select();

          document.execCommand("copy");

          auxiliar.remove();

          botonCopiarAlias.textContent =
            "Alias copiado";

          setTimeout(function () {

            botonCopiarAlias.textContent =
              "Copiar alias";

          }, 1800);

        }

      }
    );

  }


  // =====================================
  // FORMULARIO DE CONFIRMACIÓN
  // =====================================

  const botonAbrirFormulario =
    document.getElementById("abrir-formulario");

  const formularioSeccion =
    document.getElementById("formulario-seccion");

  if (botonAbrirFormulario && formularioSeccion) {

    botonAbrirFormulario.addEventListener(
      "click",
      function () {

        formularioSeccion.classList.remove("oculto");

        formularioSeccion.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  }


  // =====================================
  // ENVÍO RSVP POR WHATSAPP
  // =====================================

  const formularioRSVP =
    document.getElementById("formulario-rsvp");

  if (formularioRSVP) {

    formularioRSVP.addEventListener(
      "submit",
      function (evento) {

        evento.preventDefault();

        const asistenciaSeleccionada =
          document.querySelector(
            'input[name="asistencia"]:checked'
          );

        const nombre =
          document
            .getElementById("nombre")
            .value
            .trim();

        const menu =
          document
            .getElementById("menu")
            .value;

        const comentarios =
          document
            .getElementById("comentarios")
            .value
            .trim();

        const acompanantes =
          document
            .getElementById("acompanantes")
            .value;

        if (!nombre || !asistenciaSeleccionada) {

          alert(
            "Completá tu nombre y seleccioná si vas a asistir."
          );

          return;

        }

        const asistencia =
          asistenciaSeleccionada.value;

        let mensaje =
          "Hola, quiero confirmar mi asistencia a la boda de Flor y Santi.%0A%0A" +
          `Nombre: ${encodeURIComponent(nombre)}%0A` +
          `Asistencia: ${encodeURIComponent(asistencia)}%0A` +
          `Menú especial: ${encodeURIComponent(menu)}%0A` +
          `Acompañantes: ${encodeURIComponent(acompanantes)}%0A`;

        if (comentarios) {

          mensaje +=
            `Comentarios: ${encodeURIComponent(comentarios)}%0A`;

        }

        mensaje +=
          "%0ALa confirmación queda sujeta a validación.";

        window.open(
          `https://wa.me/5492634475711?text=${mensaje}`,
          "_blank"
        );

      }
    );

  }


  // =====================================
  // GALERÍA AMPLIADA
  // =====================================

  const fotosGaleria =
    document.querySelectorAll(".foto-galeria");

  const modalGaleria =
    document.getElementById("modal-galeria");

  const imagenAmpliada =
    document.getElementById("imagen-ampliada");

  fotosGaleria.forEach(function (foto) {

    foto.addEventListener("click", function () {

      if (!modalGaleria || !imagenAmpliada) {
        return;
      }

      const rutaImagen =
        foto.dataset.imagen;

      const imagenInterior =
        foto.querySelector("img");

      imagenAmpliada.src =
        rutaImagen;

      imagenAmpliada.alt =
        imagenInterior
          ? imagenInterior.alt
          : "Fotografía ampliada";

      modalGaleria.classList.add("abierto");

      modalGaleria.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.style.overflow = "hidden";

    });

  });


  // =====================================
  // CERRAR MODALES
  // =====================================

  const botonesCerrar =
    document.querySelectorAll("[data-cerrar]");

  function cerrarModal(modal) {

    if (!modal) {
      return;
    }

    modal.classList.remove("abierto");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow = "";

    if (
      modal.id === "modal-galeria" &&
      imagenAmpliada
    ) {
      imagenAmpliada.src = "";
    }

  }

  botonesCerrar.forEach(function (boton) {

    boton.addEventListener("click", function () {

      const idModal =
        boton.dataset.cerrar;

      const modal =
        document.getElementById(idModal);

      cerrarModal(modal);

    });

  });

  document.querySelectorAll(".modal").forEach(
    function (modal) {

      modal.addEventListener("click", function (evento) {

        if (evento.target === modal) {
          cerrarModal(modal);
        }

      });

    }
  );

  document.addEventListener(
    "keydown",
    function (evento) {

      if (evento.key !== "Escape") {
        return;
      }

      document
        .querySelectorAll(".modal.abierto")
        .forEach(function (modal) {
          cerrarModal(modal);
        });

    }
  );

});