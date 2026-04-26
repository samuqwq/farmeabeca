// ====================== MÓDULO PARES MENTORES FARMEABECA ======================

const mentoresBase = [
    {
        id: 1,
        nombre: "Valentina Rojas",
        materia: "Matemáticas",
        curso: "4° Medio",
        avatar: "👩‍🎓",
        descripcion: "Especialista en álgebra y geometría. Ayudó a 18 alumnos este año."
    },
    {
        id: 2,
        nombre: "Matías González",
        materia: "Lenguaje",
        curso: "3° Medio",
        avatar: "👨‍🎓",
        descripcion: "Experto en redacción y análisis literario."
    },
    {
        id: 3,
        nombre: "Sofía Morales",
        materia: "Historia",
        curso: "4° Medio",
        avatar: "👩‍🎓",
        descripcion: "Apasionada por la historia de Chile y procesos sociales."
    },
    {
        id: 4,
        nombre: "Javier López",
        materia: "Física",
        curso: "3° Medio",
        avatar: "👨‍🎓",
        descripcion: "Mecánica y electricidad explicadas de forma sencilla."
    },
    {
        id: 5,
        nombre: "Camila Fernández",
        materia: "Química",
        curso: "2° Medio",
        avatar: "👩‍🎓",
        descripcion: "Reacciones químicas y laboratorio práctico."
    },
    {
        id: 6,
        nombre: "Diego Silva",
        materia: "Inglés",
        curso: "4° Medio",
        avatar: "👨‍🎓",
        descripcion: "Conversación fluida y preparación PAES."
    }
];

// Renderizar mentores
function cargarMentores() {
    const container = document.getElementById('mentoresContainer');
    const user = getCurrentUser();
    
    if (!container || !user) return;

    // Actualizar FBP y saludo
    document.getElementById('fbpActual').textContent = user.fbp || 0;
    document.getElementById('userGreeting').innerHTML = `<i class="fas fa-user-graduate"></i> ${user.nombre}`;

    container.innerHTML = '';

    mentoresBase.forEach(mentor => {
        const cardHTML = `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm hover-card border-0">
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                            <span class="fs-1 me-3">${mentor.avatar}</span>
                            <div>
                                <h5 class="card-title mb-1">${mentor.nombre}</h5>
                                <small class="text-primary">${mentor.materia} • ${mentor.curso}</small>
                            </div>
                        </div>
                        <p class="card-text text-muted">${mentor.descripcion}</p>
                        
                        <button onclick="unirseMentor(${mentor.id})" 
                                class="btn btn-primary w-100 mt-3">
                            <i class="fas fa-handshake"></i> Unirme a mentoría (+5 FBP)
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// Unirse a mentoría
window.unirseMentor = function(id) {
    const user = getCurrentUser();
    if (!user || user.tipo !== 'alumno') {
        showToast('Solo los alumnos pueden unirse a mentorías', 'warning');
        return;
    }

    const mentor = mentoresBase.find(m => m.id === id);
    if (!mentor) return;

    // Ganancia para el alumno
    user.fbp = (user.fbp || 0) + 5;
    setCurrentUser(user);

    // Simular ganancia para el mentor (solo en consola y toast)
    showToast(`¡Te uniste a la mentoría de ${mentor.nombre}! +5 FBP para ti`, 'success');

    // Actualizar header
    const fbpHeader = document.getElementById('fbpActual');
    if (fbpHeader) fbpHeader.textContent = user.fbp;

    // Feedback visual en el botón
    const btn = event.target;
    btn.innerHTML = `<i class="fas fa-check-circle"></i> ¡Unido!`;
    btn.disabled = true;
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-success');
};

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    protectRoute();
    cargarMentores();
});