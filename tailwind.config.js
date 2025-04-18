/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      // Paleta de colores actualizada para un tema más fresco y claro
      colors: {
        primary: "#00ADB5", // Mantenemos el color de énfasis
        secondary: "#34D1BF", // Variante más clara para acentos secundarios
        accent: "#FF9A76", // Color para destacar elementos importantes
        "light-bg": "#FFFFFF", // Fondo principal blanco
        "off-white": "#F8F9FA", // Fondo alternativo muy claro
        "light-gray": "#E9ECEF", // Fondo para secciones alternativas
        "text-dark": "#212529", // Texto principal oscuro
        "text-medium": "#495057", // Texto secundario
        "text-light": "#6C757D", // Texto terciario
      },
      // Tipografía (Mantenemos Inter como fuente principal)
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Fuente principal moderna
      },
      // Animaciones personalizadas
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideUp: "slideUp 0.6s ease-out",
      },
      // Sombras personalizadas
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.05)",
        card: "0 10px 30px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
