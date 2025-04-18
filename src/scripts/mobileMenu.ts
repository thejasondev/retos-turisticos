/**
 * Manejo del menú móvil lateral
 * Este script proporciona la funcionalidad para el menú deslizante en móviles.
 */

export function initMobileMenu(containerSelector: string): void {
  const header = document.querySelector<HTMLElement>(containerSelector);
  if (!header) return;

  const menuButton = header.querySelector<HTMLButtonElement>(
    "#mobile-menu-button"
  );
  const overlay = header.querySelector<HTMLElement>("#mobile-menu-overlay");
  const panel = header.querySelector<HTMLElement>("#mobile-menu-panel");
  const closeButton = panel?.querySelector<HTMLButtonElement>(
    "#mobile-menu-close-button"
  );
  const hamburgerIcon = header.querySelector<SVGElement>("#hamburger-icon");
  const closeIcon = header.querySelector<SVGElement>("#close-icon");
  const menuLinks = panel?.querySelectorAll("a");

  if (
    !menuButton ||
    !overlay ||
    !panel ||
    !closeButton ||
    !hamburgerIcon ||
    !closeIcon
  ) {
    console.error("Mobile menu elements not found within", containerSelector);
    return;
  }

  function openMenu() {
    menuButton!.setAttribute("aria-expanded", "true");
    overlay!.classList.remove("pointer-events-none");
    overlay!.classList.add("opacity-100");
    overlay!.setAttribute("aria-hidden", "false");
    panel!.classList.remove("translate-x-full");
    panel!.setAttribute("aria-hidden", "false");
    document.body.classList.add("overflow-hidden"); // Lock body scroll
    hamburgerIcon!.classList.add("hidden");
    closeIcon!.classList.remove("hidden");
    // Focus the close button when menu opens for accessibility
    setTimeout(() => closeButton!.focus(), 300);
  }

  function closeMenu() {
    menuButton!.setAttribute("aria-expanded", "false");
    overlay!.classList.add("pointer-events-none");
    overlay!.classList.remove("opacity-100");
    overlay!.setAttribute("aria-hidden", "true");
    panel!.classList.add("translate-x-full");
    panel!.setAttribute("aria-hidden", "true");
    document.body.classList.remove("overflow-hidden"); // Unlock body scroll
    hamburgerIcon!.classList.remove("hidden");
    closeIcon!.classList.add("hidden");
    // Return focus to the menu button
    menuButton!.focus();
  }

  // Event listeners
  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeButton.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu); // Close when clicking backdrop

  // Close menu if a link is clicked
  menuLinks?.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu on Escape key
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuButton.getAttribute("aria-expanded") === "true"
    ) {
      closeMenu();
    }
  });

  // Optional: Close menu on resize if needed (might be annoying)
  // window.addEventListener("resize", () => {
  //   if (window.innerWidth >= 768 && menuButton.getAttribute("aria-expanded") === "true") {
  //     closeMenu();
  //   }
  // });

  // console.log(`Mobile menu initialized for ${containerSelector}`);
}
