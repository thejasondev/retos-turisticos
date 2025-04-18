/**
 * testimonials.ts
 * Script para manejar la funcionalidad del carrusel de testimonios usando Scroll Snapping
 */

export function initTestimonialsCarousel(containerSelector: string): void {
  const container = document.querySelector<HTMLElement>(containerSelector);
  if (!container) {
    // console.warn(`Testimonials container not found for selector: ${containerSelector}`);
    return;
  }

  const track = container.querySelector<HTMLElement>("#testimonials-track");
  const slides = container.querySelectorAll<HTMLElement>(".testimonial-slide");
  const prevButton =
    container.querySelector<HTMLButtonElement>("#prev-testimonial");
  const nextButton =
    container.querySelector<HTMLButtonElement>("#next-testimonial");
  const indicators =
    container.querySelectorAll<HTMLButtonElement>(".testimonial-dot");
  const totalSlides = slides.length;

  if (!track || totalSlides === 0 || indicators.length !== totalSlides) {
    console.error(
      `Testimonials track, slides, or indicators missing/mismatched within ${containerSelector}.`
    );
    return;
  }

  let currentIndex = 0;
  let slideWidth = 0;
  let isProgrammaticScroll = false; // Flag to prevent scroll listener during button clicks
  let scrollTimeout: number;

  function calculateSlideWidth() {
    // Use the first slide's offsetWidth as it includes padding
    // Assumes all slides are the same width due to min-w-full
    if (slides.length > 0) {
      slideWidth = slides[0].offsetWidth;
    }
    // console.log(`Slide width for ${containerSelector}: ${slideWidth}`);
  }

  function updateUI(newIndex: number) {
    if (newIndex < 0 || newIndex >= totalSlides) return;
    currentIndex = newIndex;

    // Update aria-hidden for slides
    slides.forEach((slide, index) => {
      slide.setAttribute(
        "aria-hidden",
        index !== currentIndex ? "true" : "false"
      );
    });

    // Update indicators
    indicators.forEach((dot, index) => {
      dot.dataset.active = index === currentIndex ? "true" : "false";
    });

    // Update button states (optional: disable at ends)
    if (prevButton) {
      prevButton.disabled = currentIndex === 0;
    }
    if (nextButton) {
      nextButton.disabled = currentIndex === totalSlides - 1;
    }
    // console.log(`UI updated for index ${currentIndex} in ${containerSelector}`);
  }

  function goToSlide(index: number) {
    if (!track || slideWidth <= 0 || index < 0 || index >= totalSlides) return;

    const targetScrollLeft = index * slideWidth;
    isProgrammaticScroll = true; // Set flag before scrolling
    track.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });
    updateUI(index);

    // Reset flag after scroll likely finished (could use scrollend event in future)
    setTimeout(() => {
      isProgrammaticScroll = false;
    }, 600); // Adjust timeout based on scroll duration
  }

  // --- Event Listeners ---

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

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  track.addEventListener(
    "scroll",
    () => {
      if (isProgrammaticScroll || slideWidth <= 0) return; // Skip if scroll triggered by buttons

      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        // Find the index of the slide closest to the left edge (snap point)
        const currentScrollLeft = track.scrollLeft;
        const newIndex = Math.round(currentScrollLeft / slideWidth);

        if (
          newIndex !== currentIndex &&
          newIndex >= 0 &&
          newIndex < totalSlides
        ) {
          updateUI(newIndex);
        }
      }, 150); // Debounce
    },
    { passive: true }
  );

  // --- Initialization ---
  calculateSlideWidth();
  updateUI(0); // Set initial state

  // Recalculate width on resize
  window.addEventListener("resize", () => {
    // Debounce resize calculation
    clearTimeout(scrollTimeout); // Reuse scrollTimeout for debounce
    scrollTimeout = window.setTimeout(() => {
      calculateSlideWidth();
      // Optional: snap back to current slide after resize if needed
      // goToSlide(currentIndex); // Re-snap might be jerky, test carefully
    }, 250);
  });

  // console.log(`Testimonials carousel initialized for ${containerSelector}`);
}
