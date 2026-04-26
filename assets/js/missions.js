// ====================== MÓDULO DE MISIONES FARMEABECA ======================

const misionesBase = [
    {
        id: 1,
        titulo: "Asistir a una mentoría",
        descripcion: "Participa en una sesión con un par mentor y comparte tu experiencia.",
        puntos: 10,
        icono: "fas fa-users"
    },
    {
        id: 2,
        titulo: "Completar apoyo psicológico",
        descripcion: "Realiza una sesión de chat psicológico o solicita ayuda profesional.",
        puntos: 5,
        icono: "fas fa-heart"
    },
    {
        id: 3,
        titulo: "Registrar asistencia perfecta",
        descripcion: "Asiste a todas tus clases durante una semana completa.",
        puntos: 15,
        icono: "fas fa-calendar-check"
    },
    {
        id: 4,
        titulo: "Completar tarea de matemáticas",
        descripcion: "Termina y entrega la tarea asignada de matemáticas.",
        puntos: 8,
        icono: "fas fa-calculator"
    },
    {
        id: 5,
        titulo: "Leer un libro recomendado",
        descripcion: "Lee al menos 30 páginas del libro sugerido por tu profesor.",
        puntos: 12,
        icono: "fas fa-book"
    },
    {
        id: 6,
        titulo: "Participar en actividad extracurricular",
        descripcion: "Únete a un taller, club o deporte escolar.",
        puntos: 10,
        icono: "fas fa-football"
    },
    {
        id: 7,
        titulo: "Ayudar a un compañero",
        descripcion: "Brinda apoyo académico a otro estudiante de tu curso.",
        puntos: 7,
        icono: "fas fa-hands-helping"
    },
    {
        id: 8,
        titulo: "Mantener el orden en tu pupitre",
        descripcion: "Organiza tu espacio de estudio por 7 días consecutivos.",
        puntos: 5,
        icono: "fas fa-desktop"
    }
];

// Cargar y renderizar misiones
function cargarMisiones() {
    const container = document.getElementById('misionesContainer');
    const user = getCurrentUser();
    
    if (!container || !user) return;

    // Actualizar FBP en header
    document.getElementById('fbpActual').textContent = user.fbp || 0;
    document.getElementById('userGreeting').innerHTML = `<i class="fas fa-user-graduate"></i> ${user.nombre}`;

    container.innerHTML = '';

    misionesBase.forEach(mision => {
        const cardHTML = `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm hover-card border-0">
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                            <i class="${mision.icono} fa-2x text-primary me-3"></i>
                            <h5 class="card-title mb-0">${mision.titulo}</h5>
                        </div>
                        <p class="card-text text-muted">${mision.descripcion}</p>
                        <div class="d-flex justify-content-between align-items-center mt-4">
                            <span class="badge bg-warning text-dark fs-6">+${mision.puntos} FBP</span>
                            <button onclick="completarMision(${mision.id})" 
                                    class="btn btn-success btn-sm px-4">
                                <i class="fas fa-check"></i> Completar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// Completar misión
window.completarMision = function(id) {
    const user = getCurrentUser();
    if (!user) return;

    const mision = misionesBase.find(m => m.id === id);
    if (!mision) return;

    // Sumar puntos
    user.fbp = (user.fbp || 0) + mision.puntos;
    setCurrentUser(user);

    // Mostrar toast
    showToast(`¡Felicidades! Ganaste +${mision.puntos} FBP`, 'success');

    // Actualizar header
    const fbpHeader = document.getElementById('fbpActual');
    if (fbpHeader) fbpHeader.textContent = user.fbp;

    // Feedback visual (deshabilitar botón)
    const btn = event.target.closest('button');
    if (btn) {
        btn.innerHTML = `<i class="fas fa-check-circle"></i> Completada`;
        btn.disabled = true;
        btn.classList.remove('btn-success');
        btn.classList.add('btn-secondary');
    }

    // Actualizar también el dashboard si está abierto en otra pestaña (opcional)
    console.log(`Misión completada: ${mision.titulo} (+${mision.puntos} FBP)`);
};

// Inicializar página de misiones
document.addEventListener('DOMContentLoaded', () => {
    protectRoute();
    cargarMisiones();
});