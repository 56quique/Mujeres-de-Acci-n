/* ESTA PARTE CONTROLA EL COMPORTAMIENTO DEL 2º Video */
/* hace que se reproduzca solo cunado se esta viendo */

document.addEventListener("DOMContentLoaded", function () {

    const video = document.querySelector(".video-encuentro");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                video.currentTime = 0; // 🔁 vuelve al inicio
                video.play();

            } else {

                video.pause();
                video.currentTime = 0; // 🔁 se reinicia al salir

            }
        });
    }, { threshold: 0.6 });

    observer.observe(video);

});




/* ESTA PARTE CONTROLA EL COMPORTAMIENTO DEL DEVOCIONAL */

document.addEventListener("DOMContentLoaded", function () {

  const encabezado = document.getElementById("encabezado-mes");
  const calendario = document.getElementById("calendario-mes");
  const acordeon = document.getElementById("acordeon-dia");

  if (!encabezado) return;

  const fecha = new Date();
  const mes = fecha.getMonth(); // 0-11
  const anio = fecha.getFullYear();
  const hoy = fecha.getDate();

  const nombresMeses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  const nombreMes = nombresMeses[mes];

  fetch(`devocionales/${nombreMes}-${anio}.html`)
    .then(res => {
      if (!res.ok) throw new Error();
      return res.text();
    })
    .then(html => {

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;

      const mesData = tempDiv.querySelector(".mes-data");

      // Cargar encabezado
      encabezado.innerHTML = `
        <h3>${mesData.dataset.titulo}</h3>
        <p>${mesData.dataset.descripcion}</p>
      `;

      // Crear calendario
      const diasEnMes = new Date(anio, mes + 1, 0).getDate();

      for (let i = 1; i <= diasEnMes; i++) {

        const diaBtn = document.createElement("div");
        diaBtn.classList.add("dia-calendario");
        diaBtn.textContent = i;

        if (i === hoy) {
          diaBtn.classList.add("dia-hoy");
        }

        diaBtn.addEventListener("click", () => abrirDia(i, tempDiv));

        calendario.appendChild(diaBtn);
      }

    })
    .catch(() => {
      encabezado.innerHTML = "<p>Devocional no disponible aún.</p>";
    });

  function abrirDia(numero, tempDiv) {

    const diaContenido = tempDiv.querySelector(`.dia[data-dia="${numero}"]`);

    if (!diaContenido) {
      acordeon.style.display = "block";
      acordeon.innerHTML = "<p>Este día aún no está disponible.</p>";
      return;
    }

    acordeon.style.display = "block";
    acordeon.innerHTML = diaContenido.innerHTML;
  }

});





          /* 8. Testimonios */

/* Esta parte realiza la aparicion automatica del 
mensaje de recivido, para el texto que se escribe
en testimonios, el 4000 significa 4 seg. */

const form = document.getElementById("form-historia");
const mensaje = document.getElementById("mensaje-envio");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const data = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            form.reset();
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
            }, 4000);

        } else {
            alert("Hubo un problema al enviar. Intenta nuevamente.");
        }
    }).catch(error => {
        alert("Error de conexión.");
    });
});


