// Elementos de inputs que deben validarse
const inputIds = [
    "vacasCantidad", "vacasPrecio",
    "torosCantidad", "torosPrecio",
    "cerdosCantidad", "cerdosPrecio",
    "gallinasCantidad", "gallinasPrecio",
    "caballosCantidad", "caballosPrecio"
];

// Inicializar validación al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    inputIds.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', validarInput);
            input.addEventListener('change', validarInput);
        }
    });
});

// Función para validar un input individual
function validarInput(event) {
    const input = event.target;
    const valor = parseFloat(input.value);

    // Si el campo está vacío, no hacer nada
    if (input.value === '' || input.value === null) {
        limpiarErrorEnInput(input);
        return true;
    }

    // Si el valor es negativo
    if (valor < 0) {
        input.classList.add('input-invalid');
        mostrarErrorEnInput(input, "No se permiten números negativos");
        input.value = '';
        return false;
    } else {
        limpiarErrorEnInput(input);
        return true;
    }
}

// Mostrar mensaje de error cerca del input
function mostrarErrorEnInput(input, mensaje) {
    // Remover mensaje anterior si existe
    const mensajeAnterior = input.parentElement.querySelector('.error-message');
    if (mensajeAnterior) {
        mensajeAnterior.remove();
    }

    // Crear nuevo mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = '⚠️ ' + mensaje;
    input.parentElement.insertBefore(errorDiv, input.nextSibling);

    // Auto-remover el mensaje después de 3 segundos
    setTimeout(() => {
        if (errorDiv.parentElement) {
            errorDiv.remove();
        }
    }, 3000);
}

// Limpiar estilos de error en el input
function limpiarErrorEnInput(input) {
    input.classList.remove('input-invalid');
    const mensajeError = input.parentElement.querySelector('.error-message');
    if (mensajeError) {
        mensajeError.remove();
    }
}

// Validar todos los inputs antes de calcular
function validarTodosLosInputs() {
    let hayErrores = false;

    inputIds.forEach(id => {
        const input = document.getElementById(id);
        if (input && input.value !== '') {
            const valor = parseFloat(input.value);
            if (valor < 0) {
                hayErrores = true;
                input.classList.add('input-invalid');
                mostrarErrorEnInput(input, "No se permiten números negativos");
                input.value = '';
            }
        }
    });

    return !hayErrores;
}

function calcular() {
    // Validar todos los inputs antes de calcular
    if (!validarTodosLosInputs()) {
        mostrarErrorGlobal("⚠️ Corrige los campos con números negativos para continuar");
        return;
    }

    let vacas = calcularAnimal("vacasCantidad", "vacasPrecio", "subVacas");
    let toros = calcularAnimal("torosCantidad", "torosPrecio", "subToros");
    let cerdos = calcularAnimal("cerdosCantidad", "cerdosPrecio", "subCerdos");
    let gallinas = calcularAnimal("gallinasCantidad", "gallinasPrecio", "subGallinas");
    let caballos = calcularAnimal("caballosCantidad", "caballosPrecio", "subCaballos");

    let total = vacas + toros + cerdos + gallinas + caballos;

    document.getElementById("totalGeneral").innerText = "Total: $" + formatear(total);
}

// Mostrar error global si hay valores negativos
function mostrarErrorGlobal(mensaje) {
    const container = document.querySelector('.container');
    let errorGlobal = document.querySelector('.error-global');
    
    if (errorGlobal) {
        errorGlobal.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message error-global';
    errorDiv.textContent = mensaje;
    container.insertBefore(errorDiv, container.firstChild);

    setTimeout(() => {
        if (errorDiv.parentElement) {
            errorDiv.remove();
        }
    }, 4000);
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
