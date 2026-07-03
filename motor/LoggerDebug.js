const logger = require("../logger");

class LoggerDebug {

    pregunta(pregunta) {

        logger.linea();

        logger.info("Pregunta");

        logger.info(pregunta);

    }

    respuesta(respuesta) {

        logger.info("Respuesta");

        logger.info(respuesta);

    }

    comentario(texto) {

        logger.info("Comentario");

        logger.info(texto);

    }

    correo(correo) {

        logger.info("Correo");

        logger.info(correo);

    }

    tiempo(ms) {

        logger.info(

            `Tiempo: ${ms} ms`

        );

    }

}

module.exports = new LoggerDebug();