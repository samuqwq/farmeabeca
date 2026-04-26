// ====================== UTILIDADES GLOBALES FARMEABECA ======================

// Mostrar toast de notificación (Bootstrap)
function showToast(message, type = 'success') {
    const toastHTML = `
        <div class="toast align-items-center text-white bg-${type} border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    const toastContainer = document.getElementById('toastContainer') || createToastContainer();
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    
    const toastElement = toastContainer.lastElementChild;
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
    
    setTimeout(() => toastElement.remove(), 5000);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.style.position = 'fixed';
    container.style.bottom = '20px';
    container.style.right = '20px';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    return container;
}

// Obtener usuario actual
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Guardar usuario actual
function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
}

// Proteger rutas (se usará en dashboards y páginas protegidas)
function protectRoute() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = '../pages/login.html';
        return null;
    }
    return user;
}

// Inicialización global
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 FarmeaBeca cargado correctamente', 'color: #0052CC; font-weight: bold');
});