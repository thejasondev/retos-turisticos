/**
 * Manejo del formulario de contacto
 * Este script proporciona la validación y funcionalidad de envío para el formulario
 */

// Declaración de tipos para EmailJS
declare global {
  interface Window {
    emailjs: any;
  }
}

document.addEventListener("DOMContentLoaded", initContactForm);

function initContactForm(): void {
  const form = document.getElementById("contact-form") as HTMLFormElement;
  const submitButton = document.getElementById(
    "submit-button"
  ) as HTMLButtonElement;
  const loadingIcon = document.getElementById("loading-icon") as HTMLElement;
  const formSuccess = document.getElementById("form-success") as HTMLElement;
  const formError = document.getElementById("form-error") as HTMLElement;

  if (!form) return;

  // ID de EmailJS (Reemplazar con tus credenciales reales)
  const EMAILJS_USER_ID = "user_tu_ID_aqui"; // Reemplazar con tu ID de usuario
  const EMAILJS_SERVICE_ID = "service_tu_id"; // Reemplazar con tu ID de servicio
  const EMAILJS_TEMPLATE_ID = "template_tu_id"; // Reemplazar con tu ID de plantilla

  // Cargar EmailJS SDK si no está presente
  loadEmailJSScript(EMAILJS_USER_ID);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validar el formulario
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Mostrar estado de carga
    if (submitButton && loadingIcon) {
      submitButton.disabled = true;
      loadingIcon.classList.remove("hidden");
    }

    // Ocultar mensajes previos
    formSuccess?.classList.add("hidden");
    formError?.classList.add("hidden");

    try {
      // Recoger datos del formulario
      const formData = new FormData(form);
      const formDataObj: Record<string, string> = {};

      formData.forEach((value, key) => {
        formDataObj[key] = value.toString();
      });

      // Envío con EmailJS
      await sendWithEmailJS(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formDataObj,
        EMAILJS_USER_ID
      );

      // Mostrar mensaje de éxito
      formSuccess?.classList.remove("hidden");
      form.reset();
    } catch (error) {
      // Mostrar mensaje de error
      formError?.classList.remove("hidden");
      console.error("Error al enviar el formulario:", error);
    } finally {
      // Restaurar botón de envío
      if (submitButton && loadingIcon) {
        submitButton.disabled = false;
        loadingIcon.classList.add("hidden");
      }
    }
  });

  // Validación de email en tiempo real
  const emailInput = document.getElementById("email") as HTMLInputElement;
  if (emailInput) {
    emailInput.addEventListener("blur", () => {
      if (emailInput.value && !isValidEmail(emailInput.value)) {
        emailInput.setCustomValidity(
          "Por favor, introduce una dirección de correo electrónico válida."
        );
      } else {
        emailInput.setCustomValidity("");
      }
    });
  }
}

/**
 * Carga el script de EmailJS si no está presente
 */
async function loadEmailJSScript(userId: string): Promise<void> {
  if (typeof window.emailjs === "undefined") {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    script.async = true;
    document.head.appendChild(script);

    // Esperar a que el script se cargue
    await new Promise<void>((resolve) => {
      script.onload = () => {
        if (window.emailjs) {
          window.emailjs.init(userId);
        }
        resolve();
      };
    });
  }
}

// Función para validar email
function isValidEmail(email: string): boolean {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

/**
 * Envía el formulario utilizando EmailJS
 * @see https://www.emailjs.com/docs/sdk/installation/
 */
async function sendWithEmailJS(
  serviceID: string,
  templateID: string,
  data: Record<string, string>,
  userID: string
): Promise<void> {
  if (!window.emailjs) {
    await loadEmailJSScript(userID);
  }

  if (!window.emailjs) {
    throw new Error("No se pudo cargar EmailJS");
  }

  try {
    await window.emailjs.send(serviceID, templateID, data);
  } catch (error) {
    console.error("Error al enviar con EmailJS:", error);
    throw new Error("Error al enviar el formulario");
  }
}

export {};
