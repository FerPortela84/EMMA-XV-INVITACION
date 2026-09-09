const portada = document.getElementById("portada");
const segundaPantalla = document.getElementById("segundaPantalla");
const pantallaFinal = document.getElementById("pantallaFinal");

const confirmar = document.getElementById("confirmar");
const formulario = document.getElementById("formulario");
const cerrarFormulario = document.getElementById("cerrarFormulario");
const enviarConfirmacion = document.getElementById("enviarConfirmacion");

const nombre = document.getElementById("nombre");
const mensajeConfirmacion = document.getElementById("mensajeConfirmacion");

const dias = document.getElementById("dias");


/* =========================
   PASAR DE LA PORTADA
   A LA CARTA
========================= */

portada.addEventListener("click", function () {

    portada.classList.add("cerrar");

    setTimeout(function () {

        portada.style.display = "none";

        segundaPantalla.classList.add("mostrar");

    }, 800);

});


/* =========================
   PASAR DE LA CARTA
   A LA PANTALLA FINAL
========================= */

segundaPantalla.addEventListener("click", function () {

    segundaPantalla.classList.add("salir");

    setTimeout(function () {

        segundaPantalla.style.display = "none";

        pantallaFinal.classList.add("mostrar-final");

    }, 700);

});


/* =========================
   CUENTA REGRESIVA
========================= */

function actualizarCuentaRegresiva() {

    const fechaEvento = new Date("2026-12-05T00:00:00");

    const ahora = new Date();

    const diferencia = fechaEvento - ahora;

    if (diferencia <= 0) {

        dias.textContent = "0";

        return;
    }

    const diasRestantes = Math.ceil(
        diferencia / (1000 * 60 * 60 * 24)
    );

    dias.textContent = diasRestantes;
}


/* Actualizar al cargar */

actualizarCuentaRegresiva();


/* Actualizar una vez por minuto */

setInterval(actualizarCuentaRegresiva, 60000);


/* =========================
   ABRIR FORMULARIO
========================= */

confirmar.addEventListener("click", function (event) {

    event.stopPropagation();

    formulario.classList.add("mostrar-formulario");

    nombre.focus();

});


/* =========================
   CERRAR FORMULARIO
========================= */

cerrarFormulario.addEventListener("click", function () {

    formulario.classList.remove("mostrar-formulario");

});


/* Evitar que tocar dentro
   del formulario haga avanzar
   la pantalla */

formulario.addEventListener("click", function (event) {

    event.stopPropagation();

});


/* =========================
   ENVIAR CONFIRMACIÓN
========================= */

enviarConfirmacion.addEventListener("click", function () {

    const nombreIngresado = nombre.value.trim();

    const asistenciaSeleccionada =
        document.querySelector(
            'input[name="asistencia"]:checked'
        );

    /* Verificar nombre */
    if (nombreIngresado === "") {
        mensajeConfirmacion.textContent =
            "Por favor, escribí tu nombre y apellido.";
        return;
    }

    /* Verificar asistencia */
    if (!asistenciaSeleccionada) {
        mensajeConfirmacion.textContent =
            "Por favor, indicá si vas a asistir.";
        return;
    }

    const respuesta = asistenciaSeleccionada.value;

    /* Mensaje para WhatsApp */
    const mensaje =
        `💌 CONFIRMACIÓN XV EMMA

Nombre: ${nombreIngresado}
Asistencia: ${
            respuesta === "SI"
                ? "SÍ, voy a asistir ❤️"
                : "NO voy a asistir"
        }`;

    /* Número de WhatsApp */
    const numeroWhatsApp = "5491166538574";

    /* Crear enlace */
    const urlWhatsApp =
        `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    /* Abrir WhatsApp */
    window.open(urlWhatsApp, "_blank");
    alert("WHATSAPP - versión nueva");

    /* Mensaje en la invitación */
    mensajeConfirmacion.textContent =
        "¡Gracias! Se abrirá WhatsApp para enviar tu confirmación. ❤️";
});