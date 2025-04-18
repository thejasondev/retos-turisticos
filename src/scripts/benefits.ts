/**
 * Funcionalidades interactivas para el componente Benefits
 * Maneja el carrusel de beneficios en dispositivos móviles
 */

export function initBenefitsCarousel(containerSelector: string): void {
  const containerElement =
    document.querySelector<HTMLElement>(containerSelector);
  if (!containerElement) {
    // console.warn(`Benefits container not found for selector: ${containerSelector}`);
    return;
  }

  // Select elements relative to the container
  const carousel =
    containerElement.querySelector<HTMLElement>("#benefits-carousel");
  const indicators = containerElement.querySelectorAll<HTMLButtonElement>(
    "#benefits-indicators button[data-indicator-index]"
  );

  if (!carousel || indicators.length === 0) {
    // console.log(`Benefits carousel or indicators not found within ${containerSelector}.`);
    return;
  }

  let currentIndex = 0;
  let slideWidth = 0; // We'll calculate this dynamically

  function calculateSlideWidth() {
    // Add null check for carousel here as well, before accessing properties
    if (!carousel) return;
    const firstSlide = carousel.querySelector<HTMLElement>(".snap-start");
    if (firstSlide) {
      const style = window.getComputedStyle(firstSlide);
      const marginRight = parseFloat(style.marginRight) || 0; // Get space-x value
      slideWidth = firstSlide.offsetWidth + marginRight;
      // console.log("Calculated slideWidth:", slideWidth);
    } else {
      // Fallback or default width if calculation fails
      // Add null check before accessing offsetWidth
      slideWidth = carousel.offsetWidth * 0.85 + 16; // Approx w-[85vw] + space-x-4 (1rem)
      // console.log("Fallback slideWidth:", slideWidth);
    }
  }

  // Initial calculation
  calculateSlideWidth();

  // Recalculate on resize
  window.addEventListener("resize", calculateSlideWidth);

  function updateIndicators(index: number): void {
    indicators.forEach((indicator, i) => {
      indicator.classList.remove(
        "w-8",
        "w-4",
        "bg-primary",
        "bg-gray-300",
        "opacity-100",
        "opacity-50"
      );

      if (i === index) {
        indicator.classList.add("w-8", "bg-primary", "opacity-100");
        indicator.setAttribute("aria-current", "true");
      } else {
        indicator.classList.add("w-4", "bg-gray-300", "opacity-50");
        indicator.setAttribute("aria-current", "false");
      }
    });
  }

  // --- Event Listeners ---

  // Update indicators on click
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      if (!slideWidth) return;
      currentIndex = index;
      carousel.scrollTo({
        left: index * slideWidth,
        behavior: "smooth",
      });
      updateIndicators(index);
    });
  });

  // Update indicators on scroll
  let scrollTimeout: number | undefined;
  carousel.addEventListener(
    "scroll",
    () => {
      if (!slideWidth) return;
      // Use timeout to debounce scroll event handling
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        const scrollPosition = carousel.scrollLeft;
        // Calculate index based on which slide is most visible
        const newIndex = Math.round(scrollPosition / slideWidth);

        if (
          newIndex !== currentIndex &&
          newIndex >= 0 &&
          newIndex < indicators.length
        ) {
          // console.log("Scroll detected, new index:", newIndex);
          currentIndex = newIndex;
          updateIndicators(newIndex);
        }
      }, 150); // Adjust debounce time as needed
    },
    { passive: true }
  ); // Use passive listener for better scroll performance

  // Initial indicator state
  updateIndicators(currentIndex);

  // console.log("Benefits carousel initialized.");
}

// Optional: Auto-initialize if loaded directly in browser (for testing)
// if (typeof document !== 'undefined') {
//   document.addEventListener("DOMContentLoaded", initBenefitsCarousel);
// }
