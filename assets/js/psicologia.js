// ====================== MÓDULO ASISTENCIA PSICOLÓGICA FARMEABECA ======================

// Mensajes de bienvenida del bot
const respuestasBot = [
    "Entiendo cómo te sientes... ¿Quieres contarme un poco más?",
    "Gracias por compartir eso conmigo. Estoy aquí para escucharte.",
    "Es normal sentir eso. ¿Hay algo en particular que te esté preocupando?",
    "Me alegra que hayas decidido hablar. ¿Cómo ha sido tu día hasta ahora?",
    "Tus sentimientos son válidos. ¿Te gustaría que te dé algunos consejos prácticos?"
];

let mensajes = [];

// Cargar historial desde localStorage
function cargarHistorial() {
    const user = getCurrentUser();
    if (!user) return [];
    
    const key = `chat_${user.id}`;
    const historial = localStorage.getItem(key);
    return historial ? JSON.parse(historial) : [];
}

// Guardar historial
function guardarHistorial(mensajes) {
    const user = getCurrentUser();
    if (!user) return;
    const key = `chat_${user.id}`;
    localStorage.setItem(key, JSON.stringify(mensajes));
}

// Renderizar chat
function renderizarChat() {
    const container = document.getElementById('chatContainer');
    if (!container) return;

    container.innerHTML = '';

    mensajes.forEach(msg => {
        const div = document.createElement('div');
        div.className = `message p-3 ${msg.tipo === 'user' ? 'user-message' : 'bot-message'}`;
        div.innerHTML = `
            <small class="d-block mb-1 opacity-75">${msg.tipo === 'user' ? 'Tú' : 'Psicólogo'}</small>
            <div>${msg.texto}</div>
        `;
        container.appendChild(div);
    });

    // Scroll al final
    container.scrollTop = container.scrollHeight;
}

// Enviar mensaje del usuario
function enviarMensaje(texto) {
    if (!texto.trim()) return;

    mensajes.push({ tipo: 'user', texto: texto });
    renderizarChat();
    guardarHistorial(mensajes);

    // Respuesta automática del bot después de 800ms
    setTimeout(() => {
        const respuesta = respuestasBot[Math.floor(Math.random() * respuestasBot.length)];
        mensajes.push({ tipo: 'bot', texto: respuesta });
        renderizarChat();
        guardarHistorial(mensajes);
    }, 800);
}

// Solicitar ayuda profesional
window.solicitarAyudaProfesional = function() {
    const user = getCurrentUser();
    if (!user) return;

    document.getElementById('modalNombre').value = user.nombre;
    const modal = new bootstrap.Modal(document.getElementById('modalAyuda'));
    modal.show();
};

window.enviarSolicitudProfesional = function() {
    const mensaje = document.getElementById('modalMensaje').value.trim();
    if (!mensaje) return;

    showToast('¡Solicitud enviada! Un psicólogo se contactará contigo pronto.', 'success');
    
    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalAyuda'));
    modal.hide();

    // Mensaje de confirmación en el chat
    mensajes.push({
        tipo: 'bot',
        texto: '✅ Tu solicitud de ayuda profesional ha sido registrada. Te contactaremos en las próximas 24 horas.'
    });
    renderizarChat();
    guardarHistorial(mensajes);

    document.getElementById('modalMensaje').value = '';
};

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    protectRoute();
    
    const user = getCurrentUser();
    if (user) {
        document.getElementById('userGreeting').innerHTML = `<i class="fas fa-user-graduate"></i> ${user.nombre}`;
    }

    // Cargar historial
    mensajes = cargarHistorial();
    
    // Si es la primera vez, agregar mensaje de bienvenida
    if (mensajes.length === 0) {
        mensajes.push({
            tipo: 'bot',
            texto: '¡Hola! Soy tu psicólogo virtual. Puedes hablar conmigo con total confianza. ¿Cómo te sientes hoy?'
        });
    }

    renderizarChat();

    // Enviar mensaje con Enter o botón
    const form = document.getElementById('chatForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('chatInput');
            enviarMensaje(input.value);
            input.value = '';
        });
    }
});