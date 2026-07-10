document.addEventListener("DOMContentLoaded", () => {
  const botonMenu = document.getElementById("boton-menu");
  const navegacion = document.getElementById("navegacion");

  const botonesFiltro = document.querySelectorAll(".boton-filtro");
  const botonesPortada = document.querySelectorAll(".filtro-portada");
  const modelos = document.querySelectorAll(".tarjeta-modelo");
  const seccionModelos = document.getElementById("modelos");

  function mostrarCategoria(categoria) {
    modelos.forEach((modelo) => {
      const coincide =
        categoria === "todos" ||
        modelo.dataset.categoria === categoria;

      modelo.classList.toggle("oculto", !coincide);
    });

    botonesFiltro.forEach((boton) => {
      boton.classList.toggle(
        "activo",
        boton.dataset.filtro === categoria
      );
    });
  }

  if (botonMenu && navegacion) {
    botonMenu.addEventListener("click", () => {
      const estaAbierto = navegacion.classList.toggle("abierta");

      botonMenu.setAttribute(
        "aria-expanded",
        String(estaAbierto)
      );

      botonMenu.textContent = estaAbierto ? "✕" : "☰";
    });

    navegacion.querySelectorAll("a").forEach((enlace) => {
      enlace.addEventListener("click", () => {
        navegacion.classList.remove("abierta");
        botonMenu.setAttribute("aria-expanded", "false");
        botonMenu.textContent = "☰";
      });
    });
  }

  botonesFiltro.forEach((boton) => {
    boton.addEventListener("click", () => {
      mostrarCategoria(boton.dataset.filtro);
    });
  });

  botonesPortada.forEach((boton) => {
    boton.addEventListener("click", () => {
      const categoria = boton.dataset.categoria;

      mostrarCategoria(categoria);

      seccionModelos.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  mostrarCategoria("todos");
});