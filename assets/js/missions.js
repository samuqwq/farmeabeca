// ====================== MISIONES GLOBALES (ADMINISTRABLES POR COLEGIO) ======================

let misionesGlobales = [];

function cargarMisionesGlobales() {
    const stored = localStorage.getItem('global_missions');
    misionesGlobales = stored ? JSON.parse(stored) : [
        {id:1, titulo:"Asistir a una mentoría", descripcion:"Participa en una sesión con un par mentor", puntos:10, icono:"fas fa-users"},
        {id:2, titulo:"Completar apoyo psicológico", descripcion:"Realiza una sesión de chat psicológico", puntos:5, icono:"fas fa-heart"},
    ];
}

function guardarMisionesGlobales() {
    localStorage.setItem('global_missions', JSON.stringify(misionesGlobales));
}

function getMisionesCompletadas(userId) {
    const key = `misiones_completadas_${userId}`;
    return JSON.parse(localStorage.getItem(key)) || [];
}

function cargarMisiones() {
    const container = document.getElementById('misionesContainer');
    const user = getCurrentUser();
    if (!container || !user) return;

    cargarMisionesGlobales();
    const completadas = getMisionesCompletadas(user.id);

    document.getElementById('fbpActual').textContent = user.fbp || 0;
    document.getElementById('userGreeting').innerHTML = `<i class="fas fa-user-graduate"></i> ${user.nombre}`;

    container.innerHTML = '';

    misionesGlobales.forEach(m => {
        const yaCompletada = completadas.includes(m.id);
        const cardHTML = `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm hover-card border-0 ${yaCompletada ? 'opacity-75' : ''}">
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                            <i class="${m.icono} fa-2x text-primary me-3"></i>
                            <h5 class="card-title mb-0">${m.titulo}</h5>
                        </div>
                        <p class="card-text text-muted">${m.descripcion}</p>
                        <div class="d-flex justify-content-between align-items-center mt-4">
                            <span class="badge bg-warning text-dark fs-6">+${m.puntos} FBP</span>
                            ${yaCompletada 
                                ? `<button class="btn btn-secondary btn-sm px-4" disabled>Completada</button>`
                                : `<button onclick="completarMision(${m.id})" class="btn btn-success btn-sm px-4">Completar</button>`
                            }
                        </div>
                    </div>
                </div>
            </div>`;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}

window.completarMision = function(id) {
    const user = getCurrentUser();
    if (!user) return;
    const mision = misionesGlobales.find(m => m.id === id);
    if (!mision) return;

    user.fbp = (user.fbp || 0) + mision.puntos;
    setCurrentUser(user);

    const key = `misiones_completadas_${user.id}`;
    let completadas = getMisionesCompletadas(user.id);
    if (!completadas.includes(id)) completadas.push(id);
    localStorage.setItem(key, JSON.stringify(completadas));

    showToast(`¡Ganaste +${mision.puntos} FBP!`, 'success');
    cargarMisiones();
};

document.addEventListener('DOMContentLoaded', () => {
    protectRoute();
    cargarMisionesGlobales();
    cargarMisiones();
});