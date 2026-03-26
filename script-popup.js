
// Nombres genéricos
const nombres = [
   "Catalina Araya", "Marco Torres", "Javiera Paz", "Diego M.",
    "Elena R.", "Bastián Soto", "Ignacio V.", "Valentina G.", 
    "Leo F.", "Roberto G.", "Julio C.", "Andrés Silva", 
    "Florencia P.", "Matías Castro", "Camila Ríos", "Nicolás H.", 
    "Sofía Valdés", "Gabriel L.", "Martina Rojas", "Felipe Tapia", 
    "Antonia S.", "Benjamín Soto", "Isidora G.", "Gonzalo M.", 
    "Paola Vicuña", "Cristian D.", "Valeria Núñez", "Joaquín E.", 
    "Francisca B.", "Tomás Herrera", "Daniela O.", "Lucas Méndez",
    "Esteban R.", "Constanza F.", "Hugo Morales", "Renata K.",
    "Víctor Jara", "Pascale M.", "Sebastián T.", "Mónica L.",
    "Ricardo Lagos", "Bárbara H.", "Simón Contreras", "Andrea V.", "Mauricio G."
];

// Listas de ciudades segmentadas
const ciudadesChile = ["Rancagua", "Santiago", "Viña del Mar", "Concepción", "Antofagasta", "La Serena", "Temuco"];
const ciudadesMundo = ["Lima", "Bogotá", "CDMX", "Buenos Aires", "Medellín", "Montevideo", "Quito", "Asunción", "Panamá"];

const bancos = [
    { nombre: "Mach", logo: "img/mach.svg", moneda: "CLP" },
    { nombre: "Skrill", logo: "img/skrill.png", moneda: "CLP" },
    { nombre: "Webpay", logo: "img/webpay.svg", moneda: "CLP" },
    { nombre: "Transferencia", logo: "img/bt_clp.svg", moneda: "CLP" },
    { nombre: "USDT", logo: "img/usdt.svg", moneda: "USDT" } // Nuevo: Banco USDT
];


function generarMontoCLP() {
    const azar = Math.random();
    let monto;

    if (azar < 0.60) { 
        // 60% MUY REDONDOS 
        const pasosRedondos = [50000, 100000];
        const paso = pasosRedondos[Math.floor(Math.random() * pasosRedondos.length)];
        const min = 10000, max = 3000000;
        monto = Math.floor((Math.random() * (max - min) + min) / paso) * paso;
    } else {
        // 40% VARIADOS 
        const min = 30000, max = 950000;
        monto = Math.floor((Math.random() * (max - min) + min) / 1000) * 1000;
    }
    return monto.toLocaleString('es-CL');
}

function generarMontoUSDT() {
    const azar = Math.random();
    let monto;

    const min = 20;
    const max = 3000;

    if (azar < 0.60) {
        // 60% DE PROBABILIDAD: Números redondos (múltiplos de 50)
        const paso = 50;
        monto = Math.floor((Math.random() * (max - min) + min) / paso) * paso;
        
        if (monto < 20) monto = 20; 
    } else {
        // 40% DE PROBABILIDAD
        monto = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Formato internacional con comas (ejemplo: 2,500)
    return monto.toLocaleString('en-US');
}

// === FUNCIÓN PRINCIPAL PARA CREAR LA NOTIFICACIÓN ===

function crearNotificacion() {
    const container = document.getElementById('notification-container');
    if (!container) return;

    // Seleccionamos el banco primero para determinar la lógica
    const banco = bancos[Math.floor(Math.random() * bancos.length)];
    const nombre = nombres[Math.floor(Math.random() * nombres.length)];
    
    let ciudad;
    let montoFinal;
    let etiquetaMoneda;

    // --- LÓGICA INTELIGENTE SEGÚN MONEDA ---
    if (banco.moneda === "CLP") {
        ciudad = ciudadesChile[Math.floor(Math.random() * ciudadesChile.length)];
        montoFinal = generarMontoCLP();
        etiquetaMoneda = "CLP";
    } else {
        // Caso USDT: Ciudades internacionales y monto USDT
        ciudad = ciudadesMundo[Math.floor(Math.random() * ciudadesMundo.length)];
        montoFinal = generarMontoUSDT();
        etiquetaMoneda = "USDT";
    }

    const notifId = `notif-${Date.now()}`;

    const html = `
        <div class="popup-notif" id="${notifId}">
            <div class="icon-box">
                <img src="${banco.logo}" alt="${banco.nombre}" class="bank-logo">
            </div>
            <div class="notif-content">
                <div class="notif-header">
                    <h4>Retiro aprobado</h4>
                    <span class="check-icon">✅</span>
                </div>
                <div class="notif-body">
                    ${nombre} retiró <b>${montoFinal} ${etiquetaMoneda}</b> · ${ciudad}
                </div>
            </div>
            <div class="close-btn" onclick="cerrarNotif('${notifId}')">×</div>
        </div>
    `;

    container.innerHTML = html;

    setTimeout(() => {
        const el = document.getElementById(notifId);
        if (el) el.classList.add('show');
    }, 100);

    setTimeout(() => {
        cerrarNotif(notifId);
    }, 6000);
}

function cerrarNotif(id) {
    const notif = document.getElementById(id);
    if (notif) {
        notif.classList.remove('show');
        setTimeout(() => {
            notif.remove();
        }, 500);
    }
}

// === BUCLE Y CICLO DE INICIO ===

function loopNotificaciones() {
    const tiempoAleatorio = Math.floor(Math.random() * (18000 - 8000 + 1)) + 8000;
    setTimeout(() => {
        crearNotificacion();
        loopNotificaciones();
    }, tiempoAleatorio);
}

// Iniciar después de 2 segundos
setTimeout(crearNotificacion, 2000);
loopNotificaciones();