const dayjs = require("dayjs");

function numeroAleatorio(min, max) {

    return Math.floor(

        Math.random() * (max - min + 1)

    ) + min;

}

async function esperar(ms) {

    return new Promise(resolve =>

        setTimeout(resolve, ms)

    );

}

async function pausaAleatoria(config) {

    const tiempo = numeroAleatorio(

        config.ESPERA_ENTRE_ACCIONES.MIN,

        config.ESPERA_ENTRE_ACCIONES.MAX

    );

    await esperar(tiempo);

    return tiempo;

}

async function pausaLectura(config) {

    const tiempo = numeroAleatorio(

        config.ESPERA_LECTURA.MIN,

        config.ESPERA_LECTURA.MAX

    );

    await esperar(tiempo);

    return tiempo;

}

function fechaHumana() {

    return dayjs().format(

        "YYYY-MM-DD HH:mm:ss"

    );

}

function fechaArchivo() {

    return dayjs().format(

        "YYYYMMDD_HHmmss"

    );

}

module.exports = {

    numeroAleatorio,

    esperar,

    pausaAleatoria,

    pausaLectura,

    fechaHumana,

    fechaArchivo

};