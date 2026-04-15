// =============================================
// script.js - FarmeaBeca (Estilo Ministerial Mineduc)
// Demo interactiva formal y profesional
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    console.log('%c✅ FarmeaBeca - JavaScript cargado correctamente (Estilo Institucional)', 'color: #0066CC; font-weight: bold; font-size: 15px;');

    // ====================== VARIABLES GLOBALES ======================
    let puntos = 2840;
    let nivel = 12;
    let racha = 27;
    let puntosParaSiguienteNivel = 680;

    // ====================== ANIMACIÓN DE CONFETI (más discreta) ======================
    function lanzarConfeti() {
        const colors = ['#0066CC', '#C8102E', '#002B5B', '#ffffff'];
        
        for (let i = 0; i < 60; i++) {
            setTimeout(() => {
                const confeti = document.createElement('div');
                confeti.style.position = 'fixed';
                confeti.style.left = Math.random() * 100 + 'vw';
                confeti.style.top = '-20px';
                confeti.style.width = Math.random() * 9 + 6 + 'px';
                confeti.style.height = confeti.style.width;
                confeti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confeti.style.opacity = Math.random() * 0.7 + 0.5;
                confeti.style.zIndex = '9999';
                document.body.appendChild(confeti);

                let posY = -20;
                let posX = parseFloat(confeti.style.left);
                const velY = Math.random() * 7 + 6;
                const velX = Math.random() * 1.2 - 0.6;

                const anim = setInterval(() => {
                    posY += velY;
                    posX += velX;
                    confeti.style.top = posY + 'px';
                    confeti.style.left = posX + 'vw';

                    if (posY > window.innerHeight + 80) {
                        clearInterval(anim);
                        confeti.remove();
                    }
                }, 18);
            }, i * 10);
        }
    }

    // ====================== ACTUALIZAR PUNTOS ======================
    function actualizarPuntos(cantidad = 0) {
        puntos += cantidad;

        document.querySelectorAll('.puntos-actuales').forEach(el => {
            if (el) el.textContent = puntos.toLocaleString('es-CL');
        });

        if (cantidad > 0) {
            lanzarConfeti();

            const notif = document.createElement('div');
            notif.style.cssText = `
                position: fixed; bottom: 100px; right: 40px;
                background: #0066CC; color: white; 
                padding: 14px 26px; border-radius: 8px;
                font-weight: 600; box-shadow: 0 10px 25px rgba(0, 102, 204, 0.3);
                z-index: 10000;`;
            notif.textContent = `+${cantidad} puntos`;
            document.body.appendChild(notif);

            setTimeout(() => {
                notif.style.transition = 'all 0.6s ease';
                notif.style.opacity = '0';
                notif.style.transform = 'translateY(-30px)';
                setTimeout(() => notif.remove(), 600);
            }, 2000);
        }
    }

    // ====================== CREACIÓN DE LA DEMO ======================
    function crearDemoInteractiva() {
        const demoWrapper = document.getElementById('demo-wrapper');
        if (!demoWrapper) return;

        demoWrapper.innerHTML = `
            <div class="row g-0" style="min-height: 680px;">
                <!-- Sidebar Institucional -->
                <div class="col-lg-3 demo-sidebar bg-light border-end p-4 d-flex flex-column">
                    <div class="text-center mb-5">
                        <img src="https://picsum.photos/id/64/110/110" alt="María Pérez" 
                             class="rounded-circle shadow-sm mb-3" width="95" height="95">
                        <h5 class="fw-semibold mb-1">María Pérez</h5>
                        <p class="text-muted small mb-2">3° Medio • Liceo 7, Santiago</p>
                        <span class="badge bg-primary px-3 py-1">Nivel ${nivel}</span>
                    </div>

                    <div class="nav flex-column nav-pills mb-auto" id="demo-tabs">
                        <a href="#" class="nav-link active d-flex align-items-center gap-3 py-3 px-4 mb-2" data-tab="dashboard">
                            <i class="fas fa-home"></i> Dashboard
                        </a>
                        <a href="#" class="nav-link d-flex align-items-center gap-3 py-3 px-4 mb-2" data-tab="misiones">
                            <i class="fas fa-tasks"></i> Misiones
                        </a>
                        <a href="#" class="nav-link d-flex align-items-center gap-3 py-3 px-4 mb-2" data-tab="tienda">
                            <i class="fas fa-store"></i> Tienda de Beneficios
                        </a>
                        <a href="#" class="nav-link d-flex align-items-center gap-3 py-3 px-4 mb-2" data-tab="chat">
                            <i class="fas fa-comments"></i> Chat Confidencial
                        </a>
                        <a href="#" class="nav-link d-flex align-items-center gap-3 py-3 px-4 mb-2" data-tab="aprende">
                            <i class="fas fa-graduation-cap"></i> Aprendizaje
                        </a>
                    </div>

                    <div class="mt-auto pt-4 border-top">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="small text-muted">Puntos disponibles</span>
                            <span class="fs-4 fw-bold text-primary puntos-actuales">${puntos}</span>
                        </div>
                        <div class="progress mt-2" style="height: 10px;">
                            <div class="progress-bar bg-primary" style="width: 68%;"></div>
                        </div>
                        <div class="small text-muted text-end mt-1">${puntosParaSiguienteNivel} pts para Nivel ${nivel + 1}</div>
                    </div>
                </div>

                <!-- Contenido Principal -->
                <div class="col-lg-9 demo-main p-5 bg-white" id="demo-main-content" style="min-height: 680px;">
                    <!-- Se cargará dinámicamente -->
                </div>
            </div>
        `;

        activarPestanas();
        mostrarDashboard();
    }

    // ====================== ACTIVAR PESTAÑAS ======================
    function activarPestanas() {
        const tabs = document.querySelectorAll('#demo-tabs a');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const seccion = tab.getAttribute('data-tab');
                if (seccion === 'dashboard') mostrarDashboard();
                else if (seccion === 'misiones') mostrarMisiones();
                else if (seccion === 'tienda') mostrarTienda();
                else if (seccion === 'chat') mostrarChat();
                else if (seccion === 'aprende') mostrarAprende();
            });
        });
    }

    // ====================== CONTENIDOS DE LAS PESTAÑAS ======================

    function mostrarDashboard() {
        const content = document.getElementById('demo-main-content');
        content.innerHTML = `
            <h4 class="mb-2 fw-semibold text-dark">Bienvenida de nuevo, María</h4>
            <p class="text-muted mb-4">Estás avanzando de forma consistente. Continúa así.</p>
            
            <div class="alert border-0 rounded-3 mb-4 text-white" style="background: linear-gradient(90deg, #0066CC, #002B5B);">
                <strong>🔥 ${racha} días de racha activa</strong> — Mantén el compromiso.
            </div>

            <div class="row g-4">
                <div class="col-lg-7">
                    <div class="card h-100">
                        <div class="card-body">
                            <h6 class="mb-4 text-dark">Misiones del día</h6>
                            <div class="list-group list-group-flush">
                                <div class="list-group-item d-flex justify-content-between align-items-center py-3">
                                    <div>Asistir a todas las clases</div>
                                    <button onclick="completarMision(150)" class="btn btn-sm btn-outline-primary">+150 pts</button>
                                </div>
                                <div class="list-group-item d-flex justify-content-between align-items-center py-3">
                                    <div>Completar módulo de ahorro</div>
                                    <button onclick="completarMision(300)" class="btn btn-sm btn-outline-primary">+300 pts</button>
                                </div>
                                <div class="list-group-item d-flex justify-content-between align-items-center py-3">
                                    <div>Leer 10 páginas del texto</div>
                                    <button onclick="completarMision(80)" class="btn btn-sm btn-outline-primary">+80 pts</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-5">
                    <div class="card h-100 text-center">
                        <div class="card-body d-flex flex-column justify-content-center">
                            <i class="fas fa-fire" style="font-size: 3.8rem; color: #C8102E;"></i>
                            <h1 class="display-1 fw-bold text-danger mt-3">${racha}</h1>
                            <p class="text-muted">días de racha</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function mostrarMisiones() {
        const content = document.getElementById('demo-main-content');
        content.innerHTML = `
            <h5 class="mb-4 text-dark">Misiones Semanales</h5>
            <div class="card">
                <div class="card-body">
                    <p class="mb-3"><strong>Progreso semanal:</strong> 5 de 7 completadas</p>
                    <div class="progress mb-4" style="height: 12px;">
                        <div class="progress-bar bg-primary" style="width: 71%;"></div>
                    </div>
                    <button onclick="completarMision(500)" class="btn btn-mineduc w-100 py-3">Completar misión grande (+500 pts)</button>
                </div>
            </div>
        `;
    }

    function mostrarTienda() {
        const content = document.getElementById('demo-main-content');
        content.innerHTML = `
            <h5 class="mb-4 text-dark">Tienda de Beneficios</h5>
            <div class="row g-4">
                <div class="col-md-6">
                    <div class="card h-100 text-center p-4" onclick="canjearBeneficio(800, 'Boleto de transporte')">
                        <div class="display-4 mb-3">🚌</div>
                        <h6>Boleto de transporte</h6>
                        <p class="text-primary fw-bold fs-5">800 puntos</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card h-100 text-center p-4" onclick="canjearBeneficio(1200, 'Almuerzo escolar')">
                        <div class="display-4 mb-3">🍱</div>
                        <h6>Almuerzo escolar</h6>
                        <p class="text-primary fw-bold fs-5">1.200 puntos</p>
                    </div>
                </div>
            </div>
        `;
    }

    function mostrarChat() {
        const content = document.getElementById('demo-main-content');
        content.innerHTML = `
            <div class="card">
                <div class="card-header bg-white">
                    <strong>Chat Confidencial con Orientadora</strong>
                </div>
                <div class="card-body bg-light" style="height: 340px;">
                    <p class="text-muted">La orientadora te responderá en breve.</p>
                </div>
                <div class="card-footer bg-white">
                    <div class="input-group">
                        <input type="text" id="chat-input" class="form-control" placeholder="Escribe tu mensaje...">
                        <button onclick="enviarMensajeChat()" class="btn btn-mineduc">Enviar</button>
                    </div>
                </div>
            </div>
        `;
    }

    function mostrarAprende() {
        const content = document.getElementById('demo-main-content');
        content.innerHTML = `
            <h5 class="mb-4 text-dark">Módulos Educativos</h5>
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center p-3">
                        <div>
                            <strong>Educación Financiera Básica</strong>
                            <div class="small text-muted">Nivel intermedio • 45% completado</div>
                        </div>
                        <button onclick="completarMision(450)" class="btn btn-mineduc btn-sm">Continuar</button>
                    </div>
                </div>
            </div>
        `;
    }

    // ====================== FUNCIONES GLOBALES ======================
    window.completarMision = function(cantidad) {
        actualizarPuntos(cantidad);
        alert(`¡Misión completada exitosamente!\nHas ganado +${cantidad} puntos.`);
    };

    window.canjearBeneficio = function(costo, nombre) {
        if (puntos >= costo) {
            puntos -= costo;
            actualizarPuntos(0);
            alert(`Canje realizado con éxito.\nHas obtenido: ${nombre}`);
        } else {
            alert("No tienes suficientes puntos para realizar este canje.");
        }
    };

    window.enviarMensajeChat = function() {
        const input = document.getElementById('chat-input');
        if (input && input.value.trim() !== '') {
            alert("Mensaje enviado. La orientadora te responderá lo antes posible.");
            input.value = '';
        }
    };

    // ====================== INICIALIZACIÓN ======================
    window.scrollToDemo = function() {
        document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
    };

    // Inicializar demo
    crearDemoInteractiva();

    // Efecto extra en logo
    const logo = document.querySelector('.navbar-brand');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('dblclick', () => actualizarPuntos(30));
    }

});