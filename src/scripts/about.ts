/**
 * Funcionalidades interactivas para el componente About
 * Maneja los tabs de la cronología y el carrusel de características en dispositivos móviles
 */

export function initAboutInteractions(): void {
  initReadMore();
  initTimelineTabs();
  initFeaturesCarousel();
}

// Función para el botón "Leer más"
function initReadMore(): void {
  const readMoreBtn = document.getElementById("read-more-btn");
  const shortText = document.getElementById("about-text-short");
  const fullText = document.getElementById("about-text-full");

  if (readMoreBtn && shortText && fullText) {
    readMoreBtn.addEventListener("click", () => {
      if (fullText.classList.contains("hidden")) {
        fullText.classList.remove("hidden");
        shortText.classList.add("hidden");
        readMoreBtn.innerHTML = `
          <span>Leer menos</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ml-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        `;
      } else {
        fullText.classList.add("hidden");
        shortText.classList.remove("hidden");
        readMoreBtn.innerHTML = `
          <span>Leer más</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ml-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        `;
      }
    });
  }
}

// Función para los tabs de la cronología
function initTimelineTabs(): void {
  const timelineTabs = document.querySelectorAll("#timeline-tabs button");
  if (timelineTabs.length > 0) {
    timelineTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Quitar clase activa de todos los tabs
        timelineTabs.forEach((t) => {
          t.classList.remove("text-primary", "border-primary");
          t.classList.add("text-text-medium", "border-transparent");
        });

        // Añadir clase activa al tab seleccionado
        tab.classList.remove("text-text-medium", "border-transparent");
        tab.classList.add("text-primary", "border-primary");

        // Mostrar contenido correspondiente
        const year = tab.getAttribute("data-year");
        document.querySelectorAll(".timeline-content").forEach((content) => {
          content.classList.add("hidden");
        });
        document.getElementById(`timeline-${year}`)?.classList.remove("hidden");
      });
    });
  }
}

// Función para el carrusel de características en móvil
function initFeaturesCarousel(): void {
  const carousel = document.getElementById("features-carousel");
  const indicators = document.querySelectorAll<HTMLButtonElement>(
    "#features-indicators button[data-indicator-index]"
  );

  if (!carousel || indicators.length === 0) return;

  // Scroll automático suave para el carrusel
  let currentIndex = 0;
  const cardWidth = 280 + 16; // Ancho de tarjeta + espacio

  // Actualizar indicadores activos
  function updateIndicators(index: number): void {
    indicators.forEach((indicator, i) => {
      // Remove all potential state classes first
      indicator.classList.remove(
        "w-4",
        "w-2",
        "bg-primary",
        "bg-gray-300",
        "opacity-100",
        "opacity-50"
      );

      if (i === index) {
        // Add active classes
        indicator.classList.add("w-4", "bg-primary", "opacity-100");
        indicator.setAttribute("aria-current", "true");
      } else {
        // Add inactive classes
        indicator.classList.add("w-2", "bg-gray-300", "opacity-50");
        indicator.setAttribute("aria-current", "false");
      }
    });
  }

  // Agregar eventos click a los indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentIndex = index;
      carousel.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
      updateIndicators(index);
    });
  });

  // Detectar desplazamiento del carrusel para actualizar indicadores
  carousel.addEventListener("scroll", () => {
    const scrollPosition = carousel.scrollLeft;
    const newIndex = Math.round(scrollPosition / cardWidth);

    if (newIndex !== currentIndex) {
      currentIndex = newIndex;
      updateIndicators(newIndex);
    }
  });
}

// Auto-inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", initAboutInteractions);

// Exportar la función para ser utilizada desde main.ts
export default initAboutInteractions;
