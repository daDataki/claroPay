const appleQR = "images/qrApple.png";
const androidQR = "images/qrAndroid.svg";
// Mostrar el modal con el QR para Apple
function showModal(imagen) {
  return function (event) {
    event.preventDefault();
    let modal = document.getElementById("qrModal");
    let qrImage = document.getElementById("qrImage");
    qrImage.src = imagen;
    modal.style.display = "flex";
  };
}
var showModalApple = showModal(appleQR);

var showModalAndroid = showModal(androidQR);
// Función para cerrar el modal
function closeModal() {
  let modal = document.getElementById("qrModal");
  modal.style.display = "none";
}

// Cerrar el modal si se hace clic fuera del contenido del modal
window.onclick = function (event) {
  var modal = document.getElementById("qrModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Asignar los eventos a los botones correctamente para mostrar el modal
document.addEventListener("DOMContentLoaded", function () {
  // Función para verificar el tamaño de la pantalla
  function isMobile() {
    return window.innerWidth < 768;
  }

  // Función para abrir modal Android o redirigir a la URL en móvil
  function showModalAndroid(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del enlace
    if (isMobile()) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.ar.claropay.app&pli=1"; // Cambia a la URL del Google Play Store
    } else {
      // Mostrar modal solo en pantallas mayores a 768px
      var modal = document.getElementById("qrModal");
      var qrImage = document.getElementById("qrImage");
      qrImage.src = "images/qrAndroid.svg";
      modal.style.display = "block";
    }
  }

  // Función para abrir modal Apple o redirigir a la URL en móvil
  function showModalApple(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del enlace
    if (isMobile()) {
      window.location.href =
        "https://apps.apple.com/ar/app/claro-pay-argentina/id6450485041"; // Cambia a la URL de la App Store
    } else {
      // Mostrar modal solo en pantallas mayores a 768px
      var modal = document.getElementById("qrModal");
      var qrImage = document.getElementById("qrImage");
      qrImage.src = "images/qrApple.png";
      modal.style.display = "block";
    }
  }

  // Botón Google Play
  Array.from(document.getElementsByClassName("download-google-play")).forEach(
    (element) => {
      element.addEventListener("click", showModalAndroid);
    }
  );

  Array.from(document.getElementsByClassName("download-app-store")).forEach(
    (element) => {
      element.addEventListener("click", showModalApple);
    }
  );

  // Google Tag Manager para eventos de descarga
  /*document
    .getElementById("download-google-play")
    .addEventListener("click", function () {
      dataLayer.push({ event: "botonDescarga", platform: "GooglePlay" });
    });

  document
    .getElementById("download-app-store")
    .addEventListener("click", function () {
      dataLayer.push({ event: "botonDescarga", platform: "AppStore" });
    });
*/
  // Flecha para scroll
  const arrowIcon = document.querySelector(".div-icon-arrow-down");
  let lastScrollTop = 0;

  arrowIcon.addEventListener("click", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight < documentHeight - 5) {
      window.scrollTo({ top: documentHeight, behavior: "smooth" });
    } else if (scrollTop + windowHeight >= documentHeight - 5) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 5) {
      arrowIcon.classList.add("rotate-180");
      arrowIcon.classList.add("change-bg");
    } else if (scrollTop < lastScrollTop) {
      arrowIcon.classList.remove("rotate-180");
      arrowIcon.classList.remove("change-bg");
    }

    lastScrollTop = scrollTop;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".list-item, .descuento-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Si el elemento está visible en el viewport, añade la clase 'animate'
          entry.target.classList.add("animate");
        } else {
          // Si el elemento sale del viewport, quita la clase 'animate' para repetir la animación
          entry.target.classList.remove("animate");
        }
      });
    },
    {
      threshold: 0.1, // Se activa cuando el 10% del elemento es visible
    }
  );

  items.forEach((item) => {
    observer.observe(item); // Observar cada list-item
  });
});

function detectMobileOS() {
  let userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Detectar si es un dispositivo móvil basado en userAgent y el ancho de la pantalla
  const isMobile =
    /android|iPad|iPhone|iPod/i.test(userAgent) && window.innerWidth <= 768;

  const toggleDisplay = (id, displayStyle) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = displayStyle;
    } else {
      console.warn(`Elemento con ID "${id}" no encontrado.`);
    }
  };

  if (isMobile) {
    // Detectar Android
    if (/android/i.test(userAgent)) {
      const deepLinkUrl = "cpay://Home";
      window.location.href = deepLinkUrl;

      toggleDisplay("download-google-play-header", "flex");
      toggleDisplay("download-app-store-header", "none");
      toggleDisplay("download-google-play-footer", "flex");
      toggleDisplay("download-app-store-footer", "none");
    }
    // Detectar iOS
    else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      toggleDisplay("download-google-play-header", "none");
      toggleDisplay("download-app-store-header", "flex");
      toggleDisplay("download-google-play-footer", "none");
      toggleDisplay("download-app-store-footer", "flex");
    }
  } else {
    // Si no es móvil (escritorio), mostrar ambos botones
    toggleDisplay("download-google-play-header", "flex");
    toggleDisplay("download-app-store-header", "flex");
    toggleDisplay("download-google-play-footer", "flex");
    toggleDisplay("download-app-store-footer", "flex");
  }
}

const pushToDataLayer = (section, subsection, action, element) => {
  let title = null;
  if(action === 'impresion'){
    title = element
    element = null
  }
  // Filtrar valores null y crear un objeto limpio
  const eventParams = {};
  if (section !== null) eventParams.section = section;
  if (subsection !== null) eventParams.subsection = subsection;
  if (action !== null) eventParams.action = action;
  if (element !== null) eventParams.element = element;
  if (title !== null) eventParams.title = title;
  

  // Verificar si hay datos para enviar
  if (Object.keys(eventParams).length === 0) {
    console.warn("No se enviarán datos debido a valores null:", {
      section,
      subsection,
      action,
      element,
      title,
    });
    return; // Salir de la función si no hay datos válidos
  }

  // Mostrar los parámetros en la consola
  console.log("Datos a enviar al dataLayer:", {
    plataforma: "claro pay",
    ...eventParams, // Desestructurar los datos filtrados
  });
  const eventName = action === 'impresion' ? 'detail_impression' : 'user_interaction';

  // Enviar los datos al dataLayer
  window.dataLayer.push({
    event: "ga4.trackEvent",
    eventName: eventName,
    eventParams: {
      plataforma: "claro pay",
      ...eventParams, // Desestructurar los datos filtrados
    },
  });
};


document.addEventListener("DOMContentLoaded", () => {
  let lastElement = null;
  let lastSubsection = null;
  let collapseCount = 0;
  let activeCollapses = new Set();
  let processedElements = {};

  // Función para manejar el evento de "mostrar" el collapse
  const handleShowEvent = (event) => {
    const button = event.target.previousElementSibling.querySelector("button");
    lastElement = button.getAttribute("data-element") || "unknown";
    lastSubsection = button.getAttribute("data-subsection") || null;
    const collapseId = `${lastElement}-${lastSubsection}`;

    if (!activeCollapses.has(collapseId)) {
      collapseCount++;
      activeCollapses.add(collapseId);
    }

    // Solo registrar una vez el evento desplegar
    if (collapseCount >= 2) {
      if (!processedElements[collapseId]) {
        pushToDataLayer(
          "preguntas frecuentes",
          lastSubsection,
          "desplegar",
          lastElement
        );
        pushToDataLayer(
          "preguntas frecuentes",
          lastSubsection,
          "impresion",
          lastElement
        );
        processedElements[collapseId] = true;
      }
    } else {
      pushToDataLayer(
        "preguntas frecuentes",
        lastSubsection,
        "desplegar",
        lastElement
      );
    }
  };

  // Función para manejar el evento de "ocultar" el collapse
  const handleHideEvent = (event) => {
    const button = event.target.previousElementSibling.querySelector("button");
    lastElement = button.getAttribute("data-element") || "unknown";
    lastSubsection = button.getAttribute("data-subsection") || null;
    const collapseId = `${lastElement}-${lastSubsection}`;

    if (activeCollapses.has(collapseId)) {
      activeCollapses.delete(collapseId);
      collapseCount--;
    }

    // Solo procesar el evento "contraer" una vez
    if (processedElements[collapseId]) {
      delete processedElements[collapseId];
    }

    pushToDataLayer(
      "preguntas frecuentes",
      lastSubsection,
      "contraer",
      lastElement
    );

    event.stopPropagation();  // Detener la propagación del evento
  };

  document.querySelectorAll(".accordion-collapse").forEach((collapse) => {
    if (!collapse.dataset.eventsAttached) {
      collapse.dataset.eventsAttached = true;

      collapse.addEventListener("show.bs.collapse", handleShowEvent);
      collapse.addEventListener("hide.bs.collapse", handleHideEvent);
    }
  });
});




// Función específica para FAQ
const trackFaqEvent = (section, element, action) => {
  window.dataLayer.push({
    event: "faqEvent",
    eventName: "faq_interaction",
    eventParams: {
      plataforma: "claro pay",
      section: section,
      action: action, // Abrir o cerrar
      element: element,
    },
  });
};

// Llamar a la función cuando se carga la página
window.onload = detectMobileOS;
