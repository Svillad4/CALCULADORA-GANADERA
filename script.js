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

// Validar que no queden campos vacíos antes de calcular
function validarCamposCompletos() {
    for (let id of inputIds) {
        const input = document.getElementById(id);
        if (!input || input.value.trim() === '') {
            return false;
        }
    }
    return true;
}

function calcular() {
    // Validar que todos los campos estén completos antes de calcular
    if (!validarCamposCompletos()) {
        alert("Completa todos los campos antes de calcular.");
        return;
    }

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
    mostrarMensajeOperacion("Cálculo realizado correctamente.");

    // ----------------------------
    // Determinar animal con mayor valor
    // ----------------------------
    // Mapear nombres legibles a los subtotales calculados
    const animales = {
        "Vacas": vacas,
        "Toros": toros,
        "Cerdos": cerdos,
        "Gallinas": gallinas,
        "Caballos": caballos
    };

    // Buscar el máximo
    let nombreMax = null;
    let valorMax = -Infinity;
    Object.entries(animales).forEach(([nombre, valor]) => {
        if (valor > valorMax) {
            valorMax = valor;
            nombreMax = nombre;
        }
    });

    // Mostrar el animal con mayor valor total (incluir formato de moneda)
    const elementoMayor = document.getElementById('mayorValor');
    if (elementoMayor) {
        elementoMayor.innerText = `El animal con mayor valor total es: ${nombreMax} ($${formatear(valorMax)})`;
    }

    // ----------------------------
    // Registrar fecha y hora del cálculo
    // ----------------------------
    const ahora = new Date();
    const fechaStr = ahora.toLocaleDateString('es-ES');
    const horaStr = ahora.toLocaleTimeString('es-CO', { hour: 'numeric', minute: '2-digit', hour12: true });
    const elementoFecha = document.getElementById('fechaCalculo');
    if (elementoFecha) {
        elementoFecha.innerText = `Cálculo realizado el ${fechaStr} a las ${horaStr}.`;
    }

    // Mostrar total de animales registrados (nueva funcionalidad)
    const totalAnimales = obtenerTotalAnimales();
    const elementoTotalAnimales = document.getElementById('totalAnimales');
    if (elementoTotalAnimales) {
        elementoTotalAnimales.innerText = `Total de animales registrados: ${totalAnimales}`;
    }
}

// Contar todas las cantidades de animales ingresadas
function obtenerTotalAnimales() {
    const cantidadIds = [
        "vacasCantidad",
        "torosCantidad",
        "cerdosCantidad",
        "gallinasCantidad",
        "caballosCantidad"
    ];

    return cantidadIds.reduce((total, id) => {
        const input = document.getElementById(id);
        const valor = input ? parseFloat(input.value) : 0;
        return total + (isNaN(valor) ? 0 : valor);
    }, 0);
}

// Mostrar error global si hay valores negativos
function mostrarErrorGlobal(mensaje) {
    ocultarMensajeOperacion();
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

function limpiarDatos() {
    const confirmar = confirm("¿Está seguro de que desea vaciar los datos?");
    if (!confirmar) {
        return;
    }

    inputIds.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.value = '';
            limpiarErrorEnInput(input);
        }
    });

    document.getElementById("totalGeneral").innerText = "Total: $0";
    document.getElementById("mensajeOperacion").innerText = '';

    // Limpiar información adicional (animal con mayor valor y fecha/hora)
    const mayorElem = document.getElementById('mayorValor');
    if (mayorElem) mayorElem.innerText = '';
    const fechaElem = document.getElementById('fechaCalculo');
    if (fechaElem) fechaElem.innerText = '';
    const totalAnimalesElem = document.getElementById('totalAnimales');
    if (totalAnimalesElem) totalAnimalesElem.innerText = '';

    const subtotales = ["subVacas", "subToros", "subCerdos", "subGallinas", "subCaballos"];
    subtotales.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.innerText = "Subtotal: $0";
        }
    });
}

function mostrarMensajeOperacion(mensaje) {
    const contenedor = document.getElementById("mensajeOperacion");
    if (!contenedor) {
        return;
    }

    contenedor.innerText = mensaje;
    contenedor.classList.add('mensaje-exito');
    contenedor.classList.remove('mensaje-error');

    clearTimeout(contenedor._mensajeTimeout);
    contenedor._mensajeTimeout = setTimeout(() => {
        if (contenedor) {
            contenedor.innerText = '';
            contenedor.classList.remove('mensaje-exito');
        }
    }, 5000);
}

function ocultarMensajeOperacion() {
    const contenedor = document.getElementById("mensajeOperacion");
    if (!contenedor) {
        return;
    }
    contenedor.innerText = '';
    contenedor.classList.remove('mensaje-exito', 'mensaje-error');
    clearTimeout(contenedor._mensajeTimeout);
}
