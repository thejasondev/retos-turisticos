/**
 * Funcionalidades interactivas para el componente Mission
 * Maneja el switch para alternar contenido en vista móvil
 */

export function initMissionToggle(containerSelector: string): void {
  const containerElement =
    document.querySelector<HTMLElement>(containerSelector);
  if (!containerElement) {
    // console.warn(`Mission container not found for selector: ${containerSelector}`);
    return;
  }

  const missionBtn =
    containerElement.querySelector<HTMLButtonElement>("#mission-btn");
  const statsBtn =
    containerElement.querySelector<HTMLButtonElement>("#stats-btn");
  const missionContent =
    containerElement.querySelector<HTMLElement>("#mission-content");
  const statsContent =
    containerElement.querySelector<HTMLElement>("#stats-content");

  if (!missionBtn || !statsBtn || !missionContent || !statsContent) {
    // console.error(`Required elements not found within ${containerSelector}`);
    return;
  }

  function setActiveView(view: "mission" | "stats") {
    if (view === "mission") {
      // Set mission active
      missionBtn?.classList.add("bg-primary", "text-white", "shadow");
      missionBtn?.classList.remove("text-text-medium", "hover:bg-gray-200");
      statsBtn?.classList.remove("bg-primary", "text-white", "shadow");
      statsBtn?.classList.add("text-text-medium", "hover:bg-gray-200");

      missionContent?.classList.remove("hidden");
      statsContent?.classList.add("hidden", "md:block"); // Keep md:block for desktop
    } else {
      // Set stats active
      statsBtn?.classList.add("bg-primary", "text-white", "shadow");
      statsBtn?.classList.remove("text-text-medium", "hover:bg-gray-200");
      missionBtn?.classList.remove("bg-primary", "text-white", "shadow");
      missionBtn?.classList.add("text-text-medium", "hover:bg-gray-200");

      statsContent?.classList.remove("hidden"); // Show stats
      missionContent?.classList.add("hidden"); // Hide mission
    }
  }

  missionBtn.addEventListener("click", () => setActiveView("mission"));
  statsBtn.addEventListener("click", () => setActiveView("stats"));

  // Initial state (mission is active by default based on HTML)
  // console.log(`Mission toggle initialized for ${containerSelector}`);
}
