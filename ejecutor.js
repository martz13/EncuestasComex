const EncuestaPage = require("./pages/EncuestaPage");

const MotorEncuesta = require("./motor/MotorEncuesta");

const logger = require("./logger");

async function ejecutarEncuesta(page, estadisticas) {

    const pagina = new EncuestaPage(page);

    const motor = new MotorEncuesta(

        pagina,

        estadisticas,

        logger

    );

    estadisticas.iniciarEncuesta();

    await motor.ejecutar();

    estadisticas.finalizarEncuesta(true);

}

module.exports = {

    ejecutarEncuesta

};