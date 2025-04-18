/**
 * testimonials.ts
 * Script para manejar la funcionalidad del carrusel de testimonios
 */

document.addEventListener("DOMContentLoaded", () => {
  initTestimonialsCarousel();
});

/**
 * Inicializa el carrusel de testimonios
 */
function initTestimonialsCarousel() {
  const carousel = document.querySelector(".testimonials-carousel");
  const slides = document.querySelectorAll(".testimonial-slide");
  const totalSlides = slides.length;

  if (!carousel || totalSlides === 0) return;

  // Elementos de navegación
  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");
  const indicators = document.querySelectorAll(".carousel-indicator");

  let currentIndex = 0;

  // Configurar estado inicial
  updateCarouselState();

  // Event listeners
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      goToSlide(currentIndex - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      goToSlide(currentIndex + 1);
    });
  }

  // Configurar indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  // Auto-avance del carrusel (descomentar para activar)
  // const autoPlayInterval = setInterval(() => {
  //   goToSlide(currentIndex + 1);
  // }, 5000);

  /**
   * Navega a una diapositiva específica
   */
  function goToSlide(index: number) {
    // Manejar el ciclo circular
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    updateCarouselState();
  }

  /**
   * Actualiza el estado visual del carrusel
   */
  function updateCarouselState() {
    // Actualizar posición de las diapositivas
    slides.forEach((slide, index) => {
      const slideElement = slide as HTMLElement;

      if (index === currentIndex) {
        slideElement.classList.add("active");
        slideElement.setAttribute("aria-hidden", "false");
        slideElement.style.opacity = "1";
        slideElement.style.transform = "translateX(0)";
      } else {
        slideElement.classList.remove("active");
        slideElement.setAttribute("aria-hidden", "true");
        slideElement.style.opacity = "0";

        // Posicionar diapositivas fuera de la vista
        const direction = index > currentIndex ? 1 : -1;
        slideElement.style.transform = `translateX(${direction * 100}%)`;
      }
    });

    // Actualizar indicadores
    indicators.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("active");
        dot.setAttribute("aria-current", "true");
      } else {
        dot.classList.remove("active");
        dot.setAttribute("aria-current", "false");
      }
    });
  }
}

export { initTestimonialsCarousel };
