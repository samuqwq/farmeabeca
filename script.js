// =============================================
// script.js - FarmeaBeca
// Demo interactiva elegante y gamificada
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    console.log('%c✅ FarmeaBeca - JavaScript cargado correctamente', 'color: #00D4C8; font-weight: bold; font-size: 15px;');

    // ====================== VARIABLES GLOBALES ======================
    let puntos = 2840;
    let nivel = 12;
    let racha = 27;
    let puntosParaSiguienteNivel = 680;

    // ====================== FUNCIONES AUXILIARES ======================

    // Animación de confeti elegante
    function lanzarConfeti() {
        const colors = ['#00D4C8', '#FF6B35', '#0A2540', '#ffffff', '#00b8af'];
        
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confeti = document.createElement('div');
                confeti.style.position = 'fixed';
                confeti.style.left = Math.random() * 100 + 'vw';
                confeti.style.top = '-15px';
                confeti.style.width = Math.random() * 10 + 6 + 'px';
                confeti.style.height = confeti.style.width;
                confeti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confeti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
                confeti.style.opacity = Math.random() * 0.8 + 0.6;
                confeti.style.zIndex = '9999';
                confeti.style.transform = `rotate(${Math.random() * 360}deg)`;
                document.body.appendChild(confeti);

                let posY = -15;
                let posX = parseFloat(confeti.style.left);
                const velocidadY = Math.random() * 9 + 7;
                const velocidadX = Math.random() * 2 - 1;

                const anim = setInterval(() => {
                    posY += velocidadY;
                    posX += velocidadX;
                    confeti.style.top = posY + 'px';
                    confeti.style.left = posX + 'vw';

                    if (posY > window.innerHeight + 50) {
                        clearInterval(anim);
                        confeti.remove();
                    }
                }, 16);
            }, i * 6);
        }
    }

    // Actualizar puntos con animación suave
    function actualizarPuntos(cantidad = 0) {
        puntos += cantidad;
        
        const puntosElements = document.querySelectorAll('.puntos-actuales');
        puntosElements.forEach(el => {
            if (el) {
                el.style.transition = 'all 0.6s ease';
                el.textContent = puntos.toLocaleString('es-CL');
            }
        });

        if (cantidad > 0) {
            lanzarConfeti();

            // Notificación elegante
            const notif = document.createElement('div');
            notif.style.position = 'fixed';
            notif.style.bottom = '100px';
            notif.style.right = '40px';
            notif.style.background = 'linear-gradient(135deg, #00D4C8, #00b8af)';
            notif.style.color = '#0A2540';
            notif.style.padding = '14px 24px';
            notif.style.borderRadius = '50px';
            notif.style.fontWeight = '700';
            notif.style.boxShadow = '0 15px 35px rgba(0, 212, 200, 0.35)';
            notif.style.zIndex = '10000';
            notif.textContent = `+${cantidad} puntos`;
            document.body.appendChild(notif);

            setTimeout(() => {
                notif.style.transition = 'all 0.7s ease';
                notif.style.opacity = '0';
                notif.style.transform = 'translateY(-40px)';
                setTimeout(() => notif.remove(), 700);
            }, 2000);
        }
    }

    // ====================== CREACIÓN DE LA DEMO INTERACTIVA ======================
    
    function crearDemoInteractiva() {
        const demoWrapper = document.getElementById('demo-wrapper');
        if (!demoWrapper) return;

        demoWrapper.innerHTML = `
            <div class="row g-0 h-100">
                <!-- Sidebar elegante -->
                <div class="col-md-3 bg-white border-end p-4 d-flex flex-column" style="min-height: 650px;">
                    <div class="text-center mb-5">
                        <img src="https://picsum.photos/id/64/110/110" alt="María Pérez" 
                             class="rounded-circle shadow" width="95" height="95">
                        <h5 class="mt-3 mb-1 fw-semibold">María Pérez</h5>
                        <p class="text-muted small">3° Medio • Liceo 7, Santiago</p>
                        <span class="badge bg-success px-3 py-1 mt-2">Nivel ${nivel}</span>
                    </div>

                    <div class="nav flex-column nav-pills mb-auto" id="demo-tabs">
                        <a href="#" class="nav-link active d-flex align-items-center gap-3 py-3 px-3" data-tab="dashboard">
                            <i class="fas fa-home fa-lg"></i> 
                            <span>Dashboard</span>
                        </a>
                        <a href="#" class="nav-link d-flex align-items-center gap-3 py-3 px-3" data-tab="misiones">
                            <i class="fas fa-tasks fa-lg"></i> 
                            <span>Misiones</span>
                        </a>
                        <a href="#" class="nav-link d-flex align-items-center gap-3 py-3 px-3" data-tab="tienda">
                            <i class="fas fa-store fa-lg"></i> 
                            <span>Tienda</span>
                        </a>
                        <a href="#" class="nav-link d-flex align-items-center gap-3 py-3 px-3" data-tab="chat">
                            <i class="fas fa-comments fa-lg"></i> 
                            <span>Chat Confidencial</span>
                        </a>
                        <a href="#" class="nav-link d-flex align-items-center gap-3 py-3 px-3" data-tab="aprende">
                            <i class="fas fa-graduation-cap fa-lg"></i> 
                            <span>Aprende</span>
                        </a>
                    </div>

                    <div class="mt-auto pt-4 border-top">
                        <div class="d-flex justify-content-between align-items-end">
                            <div>
                                <span class="small text-muted">Puntos disponibles</span>
                                <div class="fs-3 fw-bold text-accent puntos-actuales">${puntos}</div>
                            </div>
                            <div class="text-end">
                                <small class="text-muted">Racha</small><br>
                                <span class="fs-4 fw-bold text-orange"><i class="fas fa-fire"></i> ${racha}</span>
                            </div>
                        </div>
                        <div class="progress mt-3" style="height: 9px; border-radius: 999px;">
                            <div class="progress-bar" style="width: 68%; background: linear-gradient(to right, var(--accent), #FF6B35);"></div>
                        </div>
                        <div class="small text-muted text-end mt-1">${puntosParaSiguienteNivel} pts para Nivel ${nivel + 1}</div>
                    </div>
                </div>

                <!-- Contenido principal -->
                <div class="col-md-9 p-5 bg-light overflow-auto" id="demo-main-content" style="min-height: 650px;">
                    <!-- Se cargará dinámicamente -->
                </div>
            </div>
        `;

        activarPestanas();
        mostrarDashboard(); // Dashboard por defecto
    }

    // Activar pestañas
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

    // ====================== CONTENIDOS DE PESTAÑAS ======================

    function mostrarDashboard() {
        const content = document.getElementById('demo-main-content');
        content.innerHTML = `
            <h4 class="mb-2 fw-semibold">¡Bienvenida de nuevo, María! 👋</h4>
            <p class="text-muted mb-4">Estás haciendo un gran trabajo. Sigue así.</p>
            
            <div class="alert border-0 rounded-4 mb-4 text-white" style="background: linear-gradient(90deg, #00D4C8, #FF6B35);">
                <strong>🔥 ${racha} días de racha activa</strong> — ¡Mantén el impulso!
            </div>

            <div class="row g-4">
                <div class="col-lg-7">
                    <div class="card h-100">
                        <div class="card-body">
                            <h6 class="mb-4">Misiones del día</h6>
                            <div class="list-group list-group-flush">
                                <div class="list-group-item d-flex justify-content-between align-items-center py-3">
                                    <div>Asistir a todas las clases</div>
                                    <button onclick="completarMision(150)" class="btn btn-sm btn-outline-success">+150 pts</button>
                                </div>
                                <div class="list-group-item d-flex justify-content-between align-items-center py-3">
                                    <div>Completar módulo de ahorro</div>
                                    <button onclick="completarMision(300)" class="btn btn-sm btn-outline-success">+300 pts</button>
                                </div>
                                <div class="list-group-item d-flex justify-content-between align-items-center py-3">
                                    <div>Leer 10 páginas</div>
                                    <button onclick="completarMision(80)" class="btn btn-sm btn-outline-success">+80 pts</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-5">
                    <div class="card h-100 text-center">
                        <div class="card-body d-flex flex-column justify-content-center">
                            <i class="fas fa-fire" style="font-size: 4.2rem; color: #FF6B35;"></i>
                            <h1 class="display-1 fw-bold text-orange mt-3">${racha}</h1>
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
            <h5 class="mb-4">Misiones Semanales</h5>
            <div class="card">
                <div class="card-body">
                    <p class="mb-3"><strong>Progreso semanal:</strong> 5 de 7 completadas</p>
                    <div class="progress mb-4" style="height: 12px;">
                        <div class="progress-bar bg-success" style="width: 71%;"></div>
                    </div>
                    <button onclick="completarMision(500)" class="btn btn-primary w-100 py-3">Completar misión grande (+500 pts)</button>
                </div>
            </div>
        `;
    }

    function mostrarTienda() {
        const content = document.getElementById('demo-main-content');
        content.innerHTML = `
            <h5 class="mb-4">Tienda de Beneficios</h5>
            <div class="row g-4">
                <div class="col-md-6">
                    <div class="card h-100 text-center p-4 cursor-pointer" onclick="canjearBeneficio(800, 'Boleto de metro')">
                        <div class="display-4 mb-3">🚌</div>
                        <h6>Boleto de metro / bus</h6>
                        <p class="text-success fw-bold fs-5">800 puntos</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card h-100 text-center p-4 cursor-pointer" onclick="canjearBeneficio(1200, 'Almuerzo escolar')">
                        <div class="display-4 mb-3">🍱</div>
                        <h6>Almuerzo completo</h6>
                        <p class="text-success fw-bold fs-5">1.200 puntos</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card h-100 text-center p-4 cursor-pointer" onclick="canjearBeneficio(2500, 'Kit de útiles')">
                        <div class="display-4 mb-3">📚</div>
                        <h6>Kit de útiles escolares</h6>
                        <p class="text-success fw-bold fs-5">2.500 puntos</p>
                    </div>
                </div>
            </div>
        `;
    }

    function mostrarChat() {
        const content = document.getElementById('demo-main-content');
        content.innerHTML = `
            <div class="card">
                <div class="card-header bg-white border-0">
                    <strong>Chat Confidencial con Orientadora</strong>
                </div>
                <div class="card-body bg-light" style="height: 340px; overflow-y: auto;">
                    <div class="mb-4">
                        <small class="text-muted">Orientadora • hace 3 minutos</small>
                        <p class="bg-white p-3 rounded-3">Hola María, ¿cómo te ha ido esta semana?</p>
                    </div>
                </div>
                <div class="card-footer bg-white border-0">
                    <div class="input-group">
                        <input type="text" id="chat-input" class="form-control rounded-start-pill" placeholder="Escribe tu mensaje aquí...">
                        <button onclick="enviarMensajeChat()" class="btn btn-primary rounded-end-pill px-4">Enviar</button>
                    </div>
                </div>
            </div>
        `;
    }

    function mostrarAprende() {
        const content = document.getElementById('demo-main-content');
        content.innerHTML = `
            <h5 class="mb-4">Módulos Educativos</h5>
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center p-3 border-bottom">
                        <div>
                            <strong>Educación Financiera Básica</strong>
                            <div class="small text-muted">Nivel intermedio • 45% completado</div>
                        </div>
                        <button onclick="completarMision(450)" class="btn btn-primary btn-sm">Continuar</button>
                    </div>
                </div>
            </div>
        `;
    }

    // ====================== FUNCIONES GLOBALES (para onclick) ======================

    window.completarMision = function(cantidad) {
        actualizarPuntos(cantidad);
        alert(`¡Excelente! Misión completada.\nHas ganado +${cantidad} puntos 🎉`);
    };

    window.canjearBeneficio = function(costo, nombre) {
        if (puntos >= costo) {
            puntos -= costo;
            actualizarPuntos(0);
            lanzarConfeti();
            alert(`¡Canje exitoso!\nHas obtenido: ${nombre}\nTe quedan ${puntos} puntos.`);
        } else {
            alert("Lo sentimos, no tienes suficientes puntos para este beneficio.");
        }
    };

    window.enviarMensajeChat = function() {
        const input = document.getElementById('chat-input');
        if (input && input.value.trim() !== '') {
            alert("Mensaje enviado correctamente. Tu orientadora te responderá pronto.");
            input.value = '';
        }
    };

    // ====================== INICIALIZACIÓN ======================

    window.scrollToDemo = function() {
        document.getElementById('demo').scrollIntoView({
            behavior: 'smooth'
        });
    };

    // Inicializar la demo
    crearDemoInteractiva();

    // Doble clic en el logo para ganar puntos (efecto divertido)
    const logo = document.querySelector('.navbar-brand');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('dblclick', () => {
            actualizarPuntos(30);
        });
    }

});