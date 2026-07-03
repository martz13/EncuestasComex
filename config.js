require('dotenv').config();

module.exports = {
    URL: process.env.URL || "https://www.remci.com.mx/web/short/EeS9Rgn31",
    HEADLESS: process.env.HEADLESS === 'true', // Convierte el string a booleano
    DEBUG: process.env.DEBUG === 'true',
    SLOW_MO: 300,
    TIMEOUT: 10000,
    TOTAL_ENCUESTAS: parseInt(process.env.TOTAL_ENCUESTAS) || 3,
    REINTENTOS: 2,
    GUARDAR_CAPTURAS: true,
    GUARDAR_LOGS: true,

    // ... (mantén tus configuraciones de ESPERA_ENTRE_ENCUESTAS, etc. igual que antes)
    ESPERA_ENTRE_ENCUESTAS: { MIN: 3000, MAX: 6000 },
    ESPERA_ENTRE_ACCIONES: { MIN: 400, MAX: 1200 },
    ESPERA_LECTURA: { MIN: 800, MAX: 1800 }
};