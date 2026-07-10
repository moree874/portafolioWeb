document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // MENÚ DEL CELULAR
  // =========================

  const botonMenu = document.getElementById("boton-menu");
  const navegacion = document.getElementById("navegacion");

  if (botonMenu && navegacion) {

    botonMenu.addEventListener("click", function () {

      const estaAbierto = navegacion.classList.toggle("abierta");

      botonMenu.setAttribute(
        "aria-expanded",
        String(estaAbierto)
      );

      botonMenu.textContent = estaAbierto ? "✕" : "☰";

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

  const elementos = document.querySelectorAll(".revelar");

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
      threshold: 0.15
    }
  );


  elementos.forEach(function (elemento) {

    observador.observe(elemento);

  });

});