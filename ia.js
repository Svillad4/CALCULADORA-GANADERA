document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');

    sendButton.addEventListener('click', enviarMensaje);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            enviarMensaje();
        }
    });

    function enviarMensaje() {
        const pregunta = chatInput.value.trim();
        if (!pregunta) return;

        // Agregar mensaje del usuario
        agregarMensaje(pregunta, 'user');
        chatInput.value = '';

        // Simular respuesta del bot después de un pequeño delay
        setTimeout(() => {
            const respuesta = generarRespuestaIA(pregunta);
            agregarMensaje(respuesta, 'bot');
        }, 1000);
    }

    function agregarMensaje(texto, tipo) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${tipo}`;
        messageDiv.textContent = texto;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});

function generarRespuestaIA(pregunta) {
    if (!pregunta) {
        return "Escribe una pregunta para recibir una respuesta del Asistente Ganadero.";
    }

    const texto = pregunta.toLowerCase();

    if (texto.includes("toro") || texto.includes("toros")) {
        return "🐾 ¿Qué es el animal?\nEl toro es un bovino macho usado en ganadería, especialmente para reproducción y como parte del rebaño.\n\n🌿 ¿Qué come?\nCome pasto, heno y puede recibir concentrados. Necesita agua limpia y sal mineral para estar fuerte.\n\n🏡 ¿Cómo se cuida?\nSe cuida con buen espacio, sombra, agua limpia y control sanitario. Revisa su fuerza, patas y comportamiento.\n\n🧬 Especies o tipos\nHay toros Brahman, Angus y Hereford, entre otros usados para carne y cría.";
    }

    if (texto.includes("vaca") || texto.includes("vacas")) {
        return "🐾 ¿Qué es el animal?\nLa vaca es un bovino hembra muy común en la granja. Se usa para producir leche y también carne.\n\n🌿 ¿Qué come?\nCome pasto, heno y alimentos balanceados. Siempre debe tener agua limpia y buena calidad de pasto.\n\n🏡 ¿Cómo se cuida?\nNecesita un lugar limpio, buena alimentación, vacunación y revisiones de un veterinario. Mantén la ubre limpia si produce leche.\n\n🧬 Especies o tipos\nAlgunas razas son Holstein, Jersey y Brahman.";
    }

    if (texto.includes("cerdo") || texto.includes("cerdos")) {
        return "🐾 ¿Qué es el animal?\nEl cerdo es un animal de granja criado para carne. Se adapta bien a corrales y tiene crecimiento rápido.\n\n🌿 ¿Qué come?\nCome balanceado, granos, maíz y restos de cocina bien preparados. Necesita agua fresca siempre disponible.\n\n🏡 ¿Cómo se cuida?\nSe cuida con corrales limpios, buena ventilación, agua limpia y control de parásitos. Vigila su peso y evita el estrés.\n\n🧬 Especies o tipos\nAlgunos tipos son Duroc, Landrace y Pietrain.";
    }

    if (texto.includes("gallina") || texto.includes("gallinas")) {
        return "🐾 ¿Qué es el animal?\nLa gallina es un ave de granja usada para producir huevos y carne. Vive en gallineros bien organizados.\n\n🌿 ¿Qué come?\nCome granos, balanceado, maíz y a veces verduras. Necesita agua limpia y un lugar seco para poner huevos.\n\n🏡 ¿Cómo se cuida?\nSe cuida con un gallinero limpio, buena luz, agua fresca y control de parásitos. Cambia la cama y mantén el espacio ventilado.\n\n🧬 Especies o tipos\nAlgunos tipos son Leghorn, Rhode Island Red y Plymouth Rock.";
    }

    if (texto.includes("caballo") || texto.includes("caballos")) {
        return "🐾 ¿Qué es el animal?\nEl caballo es un animal de trabajo y transporte en la finca. También se usa para montar y exposiciones.\n\n🌿 ¿Qué come?\nCome pasto, heno y avena. Debe tener agua limpia y sales minerales para su salud.\n\n🏡 ¿Cómo se cuida?\nSe cuida con buen espacio, limpieza del corral, herrado regular y control de parásitos. Observa su marcha para detectar problemas.\n\n🧬 Especies o tipos\nAlgunas razas son Criollo, Árabe y Pura Sangre.";
    }

    return "No tengo suficiente información sobre ese tema.";
}
