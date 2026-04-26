// ====================== SISTEMA DE AUTENTICACIÓN FARMEABECA ======================

// Validación de RUT chileno completo (con dígito verificador)
function validarRut(rut) {
    if (!/^[0-9]{7,8}-[0-9kK]$/.test(rut)) return false;
    const tmp = rut.split('-');
    let digv = tmp[1];
    let rutSinDv = tmp[0];
    let M = 0, S = 1;
    for (; rutSinDv; rutSinDv = Math.floor(rutSinDv / 10)) {
        S = (S + rutSinDv % 10 * (9 - M++ % 6)) % 11;
    }
    const dv = S ? S - 1 : 'k';
    return dv == digv.toLowerCase();
}

// Guardar usuarios (array en localStorage)
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Registro
function registrarUsuario(usuario) {
    const users = getUsers();
    // Evitar duplicados por RUT o serie
    const existe = users.find(u => 
        (u.rut && u.rut === usuario.rut) || 
        (u.serieInstitucional && u.serieInstitucional === usuario.serieInstitucional)
    );
    if (existe) return false;

    users.push(usuario);
    saveUsers(users);
    localStorage.setItem('currentUser', JSON.stringify(usuario));
    return true;
}

// Login (demo - cualquier contraseña sirve)
function loginUsuario(identifier) {
    const users = getUsers();
    const user = users.find(u => 
        (u.rut && u.rut === identifier) || 
        (u.serieInstitucional && u.serieInstitucional === identifier) ||
        u.nombre.toLowerCase() === identifier.toLowerCase()
    );
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    }
    return null;
}

// ====================== EVENT LISTENERS ======================
document.addEventListener('DOMContentLoaded', () => {
    // Cambiar entre tabs Alumno / Colegio
    const tabAlumno = document.getElementById('tab-alumno');
    const tabColegio = document.getElementById('tab-colegio');
    const campoAlumno = document.getElementById('campo-alumno');
    const campoColegio = document.getElementById('campo-colegio');

    if (tabAlumno && tabColegio) {
        tabAlumno.addEventListener('click', () => {
            tabAlumno.classList.add('active');
            tabColegio.classList.remove('active');
            campoAlumno.classList.remove('d-none');
            campoColegio.classList.add('d-none');
        });

        tabColegio.addEventListener('click', () => {
            tabColegio.classList.add('active');
            tabAlumno.classList.remove('active');
            campoAlumno.classList.add('d-none');
            campoColegio.classList.remove('d-none');
        });
    }

    // Formulario de Registro
    const registroForm = document.getElementById('registroForm');
    if (registroForm) {
        registroForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const tipo = document.querySelector('.nav-link.active').getAttribute('data-tipo');
            const nombre = document.getElementById('nombre').value.trim();

            let usuario = {
                id: Date.now().toString(),
                tipo: tipo,
                nombre: nombre,
                fbp: 150, // bono inicial para demo
                suscripcion: "basica",
                fechaRegistro: new Date().toISOString()
            };

            if (tipo === 'alumno') {
                const rut = document.getElementById('rut').value.trim().toLowerCase();
                if (!validarRut(rut)) {
                    document.getElementById('rutError').textContent = 'RUT inválido';
                    document.getElementById('rut').classList.add('is-invalid');
                    return;
                }
                usuario.rut = rut;
            } else {
                const serie = document.getElementById('serie').value.trim();
                if (serie.length < 6) {
                    document.getElementById('serieError').textContent = 'Número de serie institucional inválido';
                    document.getElementById('serie').classList.add('is-invalid');
                    return;
                }
                usuario.serieInstitucional = serie;
            }

            if (registrarUsuario(usuario)) {
                showToast(`¡Cuenta creada exitosamente! Bienvenido, ${nombre}`, 'success');
                setTimeout(() => {
                    window.location.href = tipo === 'alumno' ? 'dashboard-alumno.html' : 'dashboard-colegio.html';
                }, 1200);
            }
        });
    }

    // Formulario de Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const identifier = document.getElementById('loginIdentifier').value.trim();
            
            const user = loginUsuario(identifier);
            if (user) {
                showToast(`¡Bienvenido de nuevo, ${user.nombre}!`, 'success');
                setTimeout(() => {
                    window.location.href = user.tipo === 'alumno' ? 'dashboard-alumno.html' : 'dashboard-colegio.html';
                }, 1000);
            } else {
                showToast('Usuario no encontrado. Regístrate primero.', 'danger');
            }
        });
    }
});