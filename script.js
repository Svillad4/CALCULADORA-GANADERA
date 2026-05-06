function calcular() {

    let vacas = calcularAnimal("vacasCantidad", "vacasPrecio", "subVacas");
    let toros = calcularAnimal("torosCantidad", "torosPrecio", "subToros");
    let cerdos = calcularAnimal("cerdosCantidad", "cerdosPrecio", "subCerdos");
    let gallinas = calcularAnimal("gallinasCantidad", "gallinasPrecio", "subGallinas");
    let caballos = calcularAnimal("caballosCantidad", "caballosPrecio", "subCaballos");

    let total = vacas + toros + cerdos + gallinas + caballos;

    document.getElementById("totalGeneral").innerText = "Total: $" + formatear(total);
}

function calcularAnimal(idCant, idPrecio, idSub) {

    let cantidad = parseFloat(document.getElementById(idCant).value) || 0;
    let precio = parseFloat(document.getElementById(idPrecio).value) || 0;

    let subtotal = cantidad * precio;

    document.getElementById(idSub).innerText = "Subtotal: $" + formatear(subtotal);

    return subtotal;
}

function formatear(numero) {
    return numero.toLocaleString("es-CO");
}

function irAIA() {
    window.location.href = "ia.html";
}

function mostrarAsistenteIA() {
    const pregunta = prompt("¿Sobre qué quieres preguntar a la IA ganadera?");
    const respuesta = generarRespuestaIA(pregunta);
    document.getElementById("iaResponse").innerText = respuesta;
}

function generarRespuestaIA(pregunta) {
    if (!pregunta) {
        return "Escribe una pregunta para recibir una respuesta de la IA.";
    }

    const texto = pregunta.toLowerCase();
    if (texto.includes("vacas") || texto.includes("res") || texto.includes("bovino")) {
        return "Para vacas, considera el peso, la condición corporal y el precio por kilo al calcular costos y beneficios.";
    }
    if (texto.includes("cerdos") || texto.includes("lechón") || texto.includes("cochino")) {
        return "Los cerdos suelen venderse por kilo o cabeza; controla la alimentación y el manejo sanitario para aumentar márgenes.";
    }
    if (texto.includes("gallinas") || texto.includes("pollo") || texto.includes("huevos")) {
        return "Las gallinas de postura requieren un manejo de alimentación constante y buena higiene para mantener la producción de huevos.";
    }
    if (texto.includes("toros") || texto.includes("macho") || texto.includes("reproductor")) {
        return "Para toros reproductores, evalúa línea genética, salud y rendimiento para no afectar la productividad del rebaño.";
    }
    if (texto.includes("caballos") || texto.includes("equit")) {
        return "Los caballos requieren un buen plan de alimentación y cuidados especiales en herrado y desparasitación.";
    }

    return "Esta es una respuesta simulada de IA. Integra una API real si deseas respuestas más precisas.";
}
