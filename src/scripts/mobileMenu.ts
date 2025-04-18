/**
 * Manejo del menú móvil
 * Este script proporciona la funcionalidad del menú para dispositivos móviles
 */

document.addEventListener("DOMContentLoaded", initMobileMenu);

function initMobileMenu(): void {
  const menuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburgerIcon = menuButton?.querySelector("svg:first-child");
  const closeIcon = menuButton?.querySelector("svg:last-child");

  if (!menuButton || !mobileMenu) return;

  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));

    // Toggle de clases para mostrar/ocultar y animar
    if (mobileMenu.classList.contains("hidden")) {
      // Abrir menú
      mobileMenu.classList.remove("hidden");
      // Pequeño delay para permitir que 'hidden' se quite antes de la transición
      requestAnimationFrame(() => {
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
        mobileMenu.style.opacity = "1";
      });
      hamburgerIcon?.classList.add("hidden");
      closeIcon?.classList.remove("hidden");
    } else {
      // Cerrar menú
      mobileMenu.style.maxHeight = "0";
      mobileMenu.style.opacity = "0";
      // Esperar a que termine la transición para añadir 'hidden'
      mobileMenu.addEventListener(
        "transitionend",
        () => {
          mobileMenu.classList.add("hidden");
        },
        { once: true }
      ); // Asegura que el listener se ejecute solo una vez

      hamburgerIcon?.classList.remove("hidden");
      closeIcon?.classList.add("hidden");
    }
  });

  // Cerrar menú si se hace clic en un enlace (opcional)
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!mobileMenu.classList.contains("hidden")) {
        menuButton.click(); // Simula clic en el botón para cerrar
      }
    });
  });

  // Cerrar el menú en cambio de tamaño de ventana
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
      mobileMenu.style.maxHeight = "0";
      mobileMenu.style.opacity = "0";
      hamburgerIcon?.classList.remove("hidden");
      closeIcon?.classList.add("hidden");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}
