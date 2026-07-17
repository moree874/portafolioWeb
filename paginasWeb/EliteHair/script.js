document.addEventListener("DOMContentLoaded", function () {

  // =====================================
  // CARTA DE COLORES
  // =====================================

  const mechones = document.querySelectorAll(".mechon");

  const imagenColor = document.getElementById("imagen-color");
  const nombreColor = document.getElementById("nombre-color");
  const codigoColor = document.getElementById("codigo-color");
  const descripcionColor = document.getElementById("descripcion-color");
  const tinturaColor = document.getElementById("tintura-color");

  mechones.forEach(function (mechon) {

    mechon.addEventListener("click", function () {

      // Quitar el estilo activo de todos
      mechones.forEach(function (elemento) {
        elemento.classList.remove("activo");
      });

      // Marcar el mechón elegido
      mechon.classList.add("activo");

      const nombre = mechon.dataset.nombre;
      const codigo = mechon.dataset.codigo;
      const tintura = mechon.dataset.tintura;
      const descripcion = mechon.dataset.descripcion;
      const imagen = mechon.dataset.imagen;

      // Pequeña animación al cambiar la imagen
      imagenColor.style.opacity = "0";
      imagenColor.style.transform = "scale(0.92)";

      setTimeout(function () {

        imagenColor.src = imagen;
        imagenColor.alt = `Mechón ${nombre}`;

        nombreColor.textContent = nombre;
        codigoColor.textContent = codigo;
        descripcionColor.textContent = descripcion;
        tinturaColor.textContent = tintura;

        imagenColor.style.opacity = "1";
        imagenColor.style.transform = "scale(1)";

      }, 180);

    });

  });


  // =====================================
  // BOTÓN RESERVAR DESDE SERVICIOS
  // =====================================

  const botonesReserva = document.querySelectorAll(".card button");
  const formularioReserva = document.querySelector("#reserva form");
  const selectorServicio = formularioReserva
    ? formularioReserva.querySelector("select")
    : null;

  botonesReserva.forEach(function (boton) {

    boton.addEventListener("click", function () {

      const tarjeta = boton.closest(".card");

      if (!tarjeta) return;

      const tituloServicio = tarjeta.querySelector("h3");

      if (tituloServicio && selectorServicio) {
        selectorServicio.value = tituloServicio.textContent.trim();
      }

      document.getElementById("reserva").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  // =====================================
  // BOTÓN RESERVAR COLOR
  // =====================================

  const botonReservarColor =
    document.querySelector(".info-detalle .btn-gold");

  if (botonReservarColor) {

    botonReservarColor.addEventListener("click", function () {

      if (selectorServicio) {
        selectorServicio.value = "Coloración";
      }

      document.getElementById("reserva").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  }


  // =====================================
  // FECHA MÍNIMA
  // =====================================

  const campoFecha =
    document.querySelector('#reserva input[type="date"]');

  if (campoFecha) {

    const hoy = new Date();

    const anio = hoy.getFullYear();

    const mes =
      String(hoy.getMonth() + 1).padStart(2, "0");

    const dia =
      String(hoy.getDate()).padStart(2, "0");

    campoFecha.min = `${anio}-${mes}-${dia}`;

  }


  // =====================================
  // FORMULARIO DE RESERVA
  // =====================================

  if (formularioReserva) {

    formularioReserva.addEventListener("submit", function (evento) {

      evento.preventDefault();

      const campos = formularioReserva.querySelectorAll(
        "input, select, textarea"
      );

      const nombre = campos[0].value.trim();
      const telefono = campos[1].value.trim();
      const servicio = campos[2].value;
      const fecha = campos[3].value;
      const hora = campos[4].value;
      const comentario = campos[5].value.trim();

      if (!nombre || !telefono || !servicio || !fecha || !hora) {
        alert("Completá todos los datos obligatorios.");
        return;
      }

      const fechaFormateada =
        new Date(fecha + "T00:00:00")
          .toLocaleDateString("es-AR");

      let mensaje =
        `Hola, quiero solicitar un turno en Elite Hair.%0A%0A` +
        `Nombre: ${encodeURIComponent(nombre)}%0A` +
        `Teléfono: ${encodeURIComponent(telefono)}%0A` +
        `Servicio: ${encodeURIComponent(servicio)}%0A`;

      if (servicio === "Coloración") {
        mensaje +=
          `Tono elegido: ${encodeURIComponent(
            nombreColor.textContent
          )}%0A` +
          `Código: ${encodeURIComponent(
            codigoColor.textContent
          )}%0A` +
          `Tintura: ${encodeURIComponent(
            tinturaColor.textContent
          )}%0A`;
      }

      mensaje +=
        `Fecha: ${encodeURIComponent(fechaFormateada)}%0A` +
        `Hora: ${encodeURIComponent(hora)}%0A`;

      if (comentario) {
        mensaje +=
          `Comentario: ${encodeURIComponent(comentario)}%0A`;
      }

      mensaje +=
        `%0AEl turno queda sujeto a confirmación.`;

      window.open(
        `https://wa.me/5492634475730?text=${mensaje}`,
        "_blank"
      );

    });

  }


  // =====================================
  // ANIMACIÓN SUAVE AL HACER SCROLL
  // =====================================

  const elementosAnimados = document.querySelectorAll(
    ".about, .card, .mechon, .detalle-color, .galeria img, #reserva form"
  );

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
      threshold: 0.12
    }
  );

  elementosAnimados.forEach(function (elemento) {
    elemento.classList.add("animar");
    observador.observe(elemento);
  });

});