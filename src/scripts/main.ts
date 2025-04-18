/**
 * Archivo principal de scripts
 * Este archivo importa y coordina todos los scripts del sitio
 */

// Importar todos los módulos
import "./mobileMenu";
import "./testimonials";
import "./contactForm";
import "./about";
import { initBenefitsCarousel } from "./benefits";
import { initMissionToggle } from "./mission";
import { initTestimonialsCarousel } from "./testimonials";

// Inicialización global
document.addEventListener("DOMContentLoaded", () => {
  console.log("Scripts cargados correctamente");

  // Inicializar carruseles de beneficios
  const benefitSections = document.querySelectorAll<HTMLElement>(
    ".js-benefits-section"
  );
  benefitSections.forEach((section, index) => {
    // Assign a unique ID if it doesn't have one, needed for the selector
    // The selector is used by initBenefitsCarousel to scope its queries
    if (!section.id) {
      section.id = `benefits-section-${index}`;
    }
    // console.log(`Initializing benefits carousel for #${section.id}`);
    initBenefitsCarousel(`#${section.id}`);
  });

  // Inicializar toggles de misión
  const missionSections = document.querySelectorAll<HTMLElement>(
    ".js-mission-section"
  );
  missionSections.forEach((section, index) => {
    if (!section.id) {
      section.id = `mission-section-${index}`;
    }
    // console.log(`Initializing mission toggle for #${section.id}`);
    initMissionToggle(`#${section.id}`);
  });

  // Inicializar carruseles de testimonios
  const testimonialSections = document.querySelectorAll<HTMLElement>(
    ".js-testimonials-section"
  );
  testimonialSections.forEach((section, index) => {
    // Ensure unique ID for scoping
    if (!section.id) {
      section.id = `testimonials-section-${index}`;
    }
    // console.log(`Initializing testimonials carousel for #${section.id}`);
    initTestimonialsCarousel(`#${section.id}`);
  });

  // Aquí puedes poner código que necesite ejecutarse en todas las páginas
  // Por ejemplo, animaciones globales, gestión de tema claro/oscuro, etc.
});

// Exportar funciones públicas si es necesario
export {};
