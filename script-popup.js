 // === DATOS ALEATORIOS PARA LA NOTIFICACIÓN ===
    const nombres = [
      "Catalina Araya", "Marco Torres", "Javiera Paz", "Diego M.",
      "Elena R.", "Bastián Soto", "Ignacio V.", "Valentina G.", "Leo F.",
      "Roberto G.",  "Julio C.",
    ];

    const ciudades = [
      "Rancagua", "Santiago", "Viña del Mar", "Concepción",
      "Antofagasta", "La Serena", "Temuco"
    ];

    // URLs de logos de bancos populares en Chile
    const bancos = [
      { nombre: "BancoEstado", logo: "img/mach.svg" },
      { nombre: "Santander", logo: "img/skrill.png" },
      { nombre: "Bci", logo: "img/webpay.svg" },
      { nombre: "Banco de Chile", logo: "img/bt_clp.svg" }
    ];

    // === FUNCIÓN PARA GENERAR EL MONTO ===
    function generarMonto() {
      const monto = Math.floor(Math.random() * (2500000 - 50000 + 1)) + 50000;
      return monto.toLocaleString('es-CL');
    }

    // === FUNCIÓN PRINCIPAL PARA CREAR LA NOTIFICACIÓN ===
    function crearNotificacion() {
      const container = document.getElementById('notification-container');

      // Elegimos datos al azar
      const nombre = nombres[Math.floor(Math.random() * nombres.length)];
      const ciudad = ciudades[Math.floor(Math.random() * ciudades.length)];
      const monto = generarMonto();
      const banco = bancos[Math.floor(Math.random() * bancos.length)]; // Banco aleatorio

      // Generamos un ID único para poder controlarla
      const notifId = `notif-${Date.now()}`;

      // Estructura del HTML (Inyectada dinámicamente)
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
                    ${nombre} retiró <b>${monto} CLP</b> · ${ciudad}
                </div>
            </div>
            <div class="close-btn" onclick="cerrarNotif('${notifId}')">×</div>
        </div>
    `;

      container.innerHTML = html;

      setTimeout(() => {
        document.getElementById(notifId).classList.add('show');
      }, 100);

      setTimeout(() => {
        cerrarNotif(notifId);
      }, 6000);
    }

    function cerrarNotif(id) {
      const notif = document.getElementById(id);
      if (notif) {
        notif.classList.remove('show'); // Inicia animación de salida
        setTimeout(() => {
          notif.remove();
        }, 500);
      }
    }

    // === BUCLE INFINITO DE NOTIFICACIONES ===
    function loopNotificaciones() {
      const tiempoAleatorio = Math.floor(Math.random() * (18000 - 8000 + 1)) + 8000;

      setTimeout(() => {
        crearNotificacion(); // Crea la notificación actual
        loopNotificaciones(); // Se llama a sí misma para crear el bucle
      }, tiempoAleatorio);
    }

    // === INICIO DEL CICLO ===
    setTimeout(crearNotificacion, 2000);
    loopNotificaciones();