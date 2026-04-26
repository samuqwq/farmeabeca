// ====================== MÓDULO SUSCRIPCIÓN FARMEABECA ======================

const planes = [
    {
        id: "basica",
        nombre: "Básico",
        precio: "Gratis",
        descripcion: "Acceso a misiones básicas y chat psicológico",
        beneficios: ["Misiones básicas", "Chat con psicólogo virtual", "5 FBP iniciales", "Acceso a mentores limitados"],
        color: "primary",
        popular: false
    },
    {
        id: "premium",
        nombre: "Premium",
        precio: "$4.990 / mes",
        descripcion: "Todo ilimitado + beneficios exclusivos",
        beneficios: ["Mentorías ilimitadas", "Apoyo psicológico prioritario", "Reportes de progreso", "FBP x2 en misiones", "Insignias exclusivas", "Acceso anticipado a nuevas funciones"],
        color: "warning",
        popular: true
    }
];

// Renderizar planes
function cargarPlanes() {
    const container = document.getElementById('planesContainer');
    const user = getCurrentUser();
    if (!container || !user) return;

    document.getElementById('userGreeting').innerHTML = `<i class="fas fa-user-graduate"></i> ${user.nombre}`;
    
    // Cambiar botón de volver según tipo de usuario
    const volverBtn = document.getElementById('volverDashboard');
    if (user.tipo === 'colegio') {
        volverBtn.href = 'dashboard-colegio.html';
        volverBtn.textContent = '← Volver al Dashboard Colegio';
    }

    container.innerHTML = '';

    planes.forEach(plan => {
        const esActual = user.suscripcion === plan.id;
        
        const cardHTML = `
            <div class="col-lg-5 col-md-6">
                <div class="card h-100 shadow-sm border-0 position-relative ${plan.popular ? 'border-warning border-3' : ''}">
                    ${plan.popular ? `<span class="badge bg-warning text-dark position-absolute top-0 start-50 translate-middle">MÁS POPULAR</span>` : ''}
                    <div class="card-body p-5">
                        <div class="text-center mb-4">
                            <h3 class="fw-bold">${plan.nombre}</h3>
                            <h2 class="display-4 fw-bold text-${plan.color}">${plan.precio}</h2>
                            <p class="text-muted">${plan.descripcion}</p>
                        </div>
                        
                        <ul class="list-unstyled mb-5">
                            ${plan.beneficios.map(b => `<li class="mb-2"><i class="fas fa-check text-success me-2"></i>${b}</li>`).join('')}
                        </ul>

                        ${esActual 
                            ? `<button class="btn btn-success w-100 py-3 fw-semibold disabled">✓ Plan Actual</button>`
                            : `<button onclick="suscribirse('${plan.id}')" class="btn btn-${plan.color} w-100 py-3 fw-semibold">Suscribirme ahora</button>`
                        }
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// Cambiar suscripción
window.suscribirse = function(planId) {
    const user = getCurrentUser();
    if (!user) return;

    user.suscripcion = planId;
    setCurrentUser(user);

    showToast(`¡Felicidades! Ahora tienes el plan <strong>${planId === 'premium' ? 'Premium' : 'Básico'}</strong>`, 'success');
    
    // Recargar la página para actualizar los planes
    setTimeout(() => {
        window.location.reload();
    }, 1400);
};

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    protectRoute();
    cargarPlanes();
});