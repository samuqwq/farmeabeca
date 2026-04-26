// ====================== LÓGICA DE DASHBOARDS FARMEABECA ======================

document.addEventListener('DOMContentLoaded', () => {
    const user = protectRoute();
    if (!user) return;

    // Dashboard Alumno
    if (window.location.pathname.includes('dashboard-alumno')) {
        // Bienvenida
        document.getElementById('welcomeName').textContent = `¡Hola, ${user.nombre}! 👋`;
        document.getElementById('userGreeting').innerHTML = `<i class="fas fa-user-graduate"></i> ${user.nombre}`;

        // Mostrar FBP
        const fbpElement = document.getElementById('fbpPoints');
        if (fbpElement) fbpElement.textContent = user.fbp || 0;

        // Barra de progreso (demo)
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            const progress = Math.min((user.fbp || 0) / 500 * 100, 100);
            progressBar.style.width = `${progress}%`;
        }
    }

    // Dashboard Colegio
    if (window.location.pathname.includes('dashboard-colegio')) {
        document.getElementById('colegioName').textContent = user.nombre;
        document.getElementById('colegioTitle').textContent = `Dashboard - ${user.nombre}`;

        // Cargar alumnos simulados (todos los usuarios tipo "alumno")
        cargarAlumnos();
    }
});

// Cargar lista de alumnos para el colegio (demo)
function cargarAlumnos() {
    const tbody = document.querySelector('#tablaAlumnos tbody');
    if (!tbody) return;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const alumnos = users.filter(u => u.tipo === 'alumno');

    tbody.innerHTML = '';

    if (alumnos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" class="text-center text-muted py-4">Aún no hay alumnos registrados</td></tr>`;
        return;
    }

    alumnos.forEach(alumno => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${alumno.nombre}</td>
            <td>${alumno.rut || '—'}</td>
            <td class="text-end fw-semibold">${alumno.fbp || 0} FBP</td>
        `;
        tbody.appendChild(row);
    });

    // Actualizar contadores
    document.getElementById('totalAlumnos').textContent = alumnos.length;
    const totalFBP = alumnos.reduce((sum, a) => sum + (a.fbp || 0), 0);
    document.getElementById('totalFBP').textContent = totalFBP;
}