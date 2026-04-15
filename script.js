// =============================================
// script.js - Pilar Digital
// Demo interactiva completa + gamificación
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    
    console.log('%c✅ Pilar Digital - JavaScript cargado correctamente', 'color: #00D4C8; font-weight: bold; font-size: 14px;');

    // ====================== VARIABLES GLOBALES ======================
    let puntos = 2840;
    let nivel = 12;
    let racha = 27;
    let puntosParaSiguienteNivel = 680;

    // ====================== FUNCIONES AUXILIARES ======================
    
    // Animación de confeti
    function lanzarConfeti() {
        const colors = ['#00D4C8', '#FF6B35', '#0A2540', '#ffffff'];
        
        for (let i = 0; i < 80; i++) {
            setTimeout(() => {
                const confeti = document.createElement('div');
                confeti.style.position = 'fixed';
                confeti.style.left = Math.random() * 100 + 'vw';
                confeti.style.top = '-10px';
                confeti.style.width = '10px';
                confeti.style.height = '10px';
                confeti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confeti.style.opacity = Math.random() + 0.5;
                confeti.style.transform = `rotate(${Math.random() * 360}deg)`;
                confeti.style.zIndex = '9999';
                document.body.appendChild(confeti);

                let posY = -10;
                const velocidad = Math.random() * 8 + 6;

                const anim = setInterval(() => {
                    posY += velocidad;
                    confeti.style.top = posY + 'px';
                    confeti.style.left = (parseFloat(confeti.style.left) + (Math.random() * 2 - 1)) + 'vw';

                    if (posY > window.innerHeight) {
                        clearInterval(anim);
                        confeti.remove();
                    }
                }, 16);
            }, i * 8);
        }
    }

    // Actualizar puntos en tiempo real
    function actualizarPuntos(cantidad = 0) {
        puntos += cantidad;
        const puntosElements = document.querySelectorAll('.puntos-actuales');
        puntosElements.forEach(el => {
            if (el) el.textContent = puntos.toLocaleString('es-CL');
        });

        // Animación de aumento
        if (cantidad > 0) {
            lanzarConfeti();
            const notif = document.createElement('div');
            notif.style.position = 'fixed';
            notif.style.bottom = '100px';
            notif.style.right = '30px';
            notif.style.background = '#00D4C8';
            notif.style.color = '#0A2540';
            notif.style.padding = '12px 20px';
            notif.style.borderRadius = '50px';
            notif.style.fontWeight = 'bold';
            notif.style.boxShadow = '0 10px 30px rgba(0,212,200,0.4)';
            notif.textContent = `+${cantidad} pts`;
            document.body.appendChild(notif);

            setTimeout(() => {
                notif.style.transition = 'all 0.6s ease';
                notif.style.opacity = '0';
                notif.style.transform = 'translateY(-30px)';
                setTimeout(() => notif.remove(), 600);
            }, 1800);
        }
    }

    // ====================== DEMO INTERACTIVA ======================
    
    // Crear la interfaz completa de la demo
    function crearDemoInteractiva() {
        const demoContent = document.getElementById('demo-content');
        if (!demoContent) return;

        demoContent.innerHTML = `
            <div class="row h-100 g-0">
                <!-- Sidebar -->
                <div class="col-md-3 bg-white border-end p-4 d-flex flex-column" style="min-height: 620px;">
                    <div class="text-center mb-4">
                        <img src="https://picsum.photos/id/64/120/120" alt="María Pérez" 
                             class="rounded-circle shadow-sm" width="90" height="90">
                        <h5 class="mt-3 mb-1">María Pérez</h5>
                        <p class="text-muted small mb-0">3° Medio • Liceo 7</p>
                        <div class="mt-2">
                            <span class="badge bg-success">Nivel ${nivel}</span>
                        </div>
                    </div>

                    <div class="nav flex-column nav-pills mb-4" id="demo-tabs">
                        <a href="#" class="nav-link active d-flex align-items-center gap-3 py-3" data-tab="dashboard">
                            <i class="fas fa-home"></i> Dashboard
                        </a>
                        <a href="#" class="nav-link d-flex align-items-center gap-3 py-3" data-tab="misiones">
                            <i class="fas fa-tasks"></i> Misiones
                        </a>
                        <a href="#" class="nav-link d-flex align-items-center gap-3 py-3" data-tab="tienda">
                            <i class="fas fa-store"></i> Tienda
                        </a>
                        <a href="#" class="nav-link d-flex align-items-center gap-3 py-3" data-tab="chat">
                            <i class="fas fa-comments"></i> Chat Confidencial
                        </a>
                        <a href="#" class="nav-link d-flex align-items-center gap-3 py-3" data-tab="aprende">
                            <i class="fas fa-graduation-cap"></i> Aprende
                        </a>
                    </div>

                    <div class="mt-auto pt-4 border-top">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="small text-muted">Puntos disponibles</span>
                            <span class="fs-4 fw-bold text-turquoise puntos-actuales">${puntos}</span>
                        </div>
                        <div class="progress mt-2" style="height: 10px;">
                            <div class="progress-bar bg-gradient" style="width: 68%; background: linear-gradient(to right, #00D4C8, #FF6B35);"></div>
                        </div>
                        <div class="small text-end text-muted mt-1">${puntosParaSiguienteNivel} pts para Nivel ${nivel + 1}</div>
                    </div>
                </div>

                <!-- Contenido principal -->
                <div class="col-md-9 p-5 bg-light overflow-auto" id="demo-main-content" style="min-height: 620px;">
                    <!-- Se cargará dinámicamente según la pestaña -->
                </div>
            </div>
        `;

        // Activar pestañas
        activarPestanas();
        
        // Cargar dashboard por defecto
        mostrarDashboard();
    }

    function activarPestanas() {
        const tabs = document.querySelectorAll('#demo-tabs a');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remover active de todos
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
            <h4 class="mb-1">¡Hola de nuevo, María! 👋</h4>
            <p class="text-muted">Hoy es un excelente día para seguir creciendo.</p>
            
            <div class="alert alert-info border-0 rounded-4 mb-4" style="background: linear-gradient(90deg, #00D4C8, #FF6B35); color: white;">
                <strong>🔥 ${racha} días de racha!</strong> Mantén el fuego encendido.
            </div>

            <div class="row g-4">
                <div class="col-12 col-lg-7">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="card-title mb-3">Misiones del día</h6>
                            <div class="list-group list-group-flush">
                                <div class="list-group-item d-flex justify-content-between align-items-center">
                                    <div>Asistir a todas las clases</div>
                                    <button onclick="completarMision(150)" class="btn btn-sm btn-outline-success">+150 pts</button>
                                </div>
                                <div class="list-group-item d-flex justify-content-between align-items-center">
                                    <div>Completar módulo de ahorro</div>
                                    <button onclick="completarMision(300)" class="btn btn-sm btn-outline-success">+300 pts</button>
                                </div>
                                <div class="list-group-item d-flex justify-content-between align-items-center">
                                    <div>Leer 10 páginas del libro</div>
                                    <button onclick="completarMision(80)" class="btn btn-sm btn-outline-success">+80 pts</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-lg-5">
                    <div class="card h-100 text-center">
                        <div class="card-body">
                            <i class="fas fa-fire streak-fire" style="font-size: 4rem;"></i>
                            <h1 class="display-1 fw-bold text-warning mt-3">${racha}</h1>
                            <p class="text-muted">días de racha</p>
                            <small class="text-success fw-semibold">¡No la pierdas!</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function mostrarMisiones() {
        const content = document.getElementById('demo-main-content');
        content.innerHTML = `
            <h5 class="mb-4">Misiones semanales</h5>
            <div class="card">
                <div class="card-body">
                    <p><strong>Progreso semanal:</strong> 4 de 7 completadas</p>
                    <div class="progress mb-4" style="height: 12px;">
                        <div class="progress-bar" style="width: 57%;"></div>
                    </div>
                    <button onclick="completarMision(500)" class="btn btn-primary w-100">Completar misión grande (+500 pts)</button>
                </div>
            </div>
        `;
    }

    function mostrarTienda() {
        const content = document.getElementById('demo-main-content');
        content.innerHTML = `
            <h5 class="mb-4">Tienda de beneficios</h5>
            <div class="row g-3">
                <div class="col-6">
                    <div class="card h-100 text-center p-3" onclick="canjearBeneficio(800, 'Boleto de metro')">
                        <div class="mb-2">🚌</div>
                        <h6>Boleto de metro</h6>
                        <p class="text-success fw-bold">800 pts</p>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card h-100 text-center p-3" onclick="canjearBeneficio(1200, 'Almuerzo escolar')">
                        <div class="mb-2">🍱</div>
                        <h6>Almuerzo escolar</h6>
                        <p class="text-success fw-bold">1.200 pts</p>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card h-100 text-center p-3" onclick="canjearBeneficio(2500, 'Útiles escolares')">
                        <div class="mb-2">📚</div>
                        <h6>Kit de útiles</h6>
                        <p class="text-success fw-bold">2.500 pts</p>
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
                <div class="card-body bg-light" style="height: 320px; overflow-y: auto;">
                    <div class="mb-3">
                        <small class="text-muted">Orientadora • hace 2 min</small>
                        <p class="bg-white p-3 rounded-3">Hola María, ¿cómo te sientes hoy?</p>
                    </div>
                </div>
                <div class="card-footer bg-white">
                    <div class="input-group">
                        <input type="text" id="chat-input" class="form-control" placeholder="Escribe tu mensaje...">
                        <button onclick="enviarMensajeChat()" class="btn btn-primary">Enviar</button>
                    </div>
                </div>
            </div>
        `;
    }

    function mostrarAprende() {
        const content = document.getElementById('demo-main-content');
        content.innerHTML = `
            <h5 class="mb-4">Módulos educativos</h5>
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center py-3 border-bottom">
                        <div>
                            <strong>Educación Financiera Básica</strong>
                            <div class="small text-muted">Nivel intermedio</div>
                        </div>
                        <button onclick="completarMision(450)" class="btn btn-sm btn-primary">Continuar</button>
                    </div>
                </div>
            </div>
        `;
    }

    // ====================== FUNCIONES INTERACTIVAS ======================

    window.completarMision = function(cantidad) {
        actualizarPuntos(cantidad);
        alert(`¡Misión completada! +${cantidad} puntos`);
    };

    window.canjearBeneficio = function(costo, nombre) {
        if (puntos >= costo) {
            puntos -= costo;
            actualizarPuntos(0); // solo actualiza sin sumar
            lanzarConfeti();
            alert(`¡Canje exitoso! Has obtenido: ${nombre}\nTe quedan ${puntos} puntos.`);
        } else {
            alert("No tienes suficientes puntos para este beneficio.");
        }
    };

    window.enviarMensajeChat = function() {
        const input = document.getElementById('chat-input');
        if (input && input.value.trim() !== '') {
            alert("Mensaje enviado a tu orientadora. Recibirás respuesta pronto.");
            input.value = '';
        }
    };

    // ====================== INICIALIZACIÓN ======================
    
    // Crear la demo interactiva completa
    crearDemoInteractiva();

    // Scroll suave al hacer clic en "Probar Demo"
    window.scrollToDemo = function() {
        document.getElementById('demo').scrollIntoView({
            behavior: 'smooth'
        });
    };

    // Bonus: Doble clic en el logo del navbar para ganar puntos (efecto divertido)
    const navbarBrand = document.querySelector('.navbar-brand');
    if (navbarBrand) {
        navbarBrand.addEventListener('dblclick', () => {
            actualizarPuntos(50);
        });
    }

});