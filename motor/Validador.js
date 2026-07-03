class Validador {

    validarRespuesta(respuesta, pregunta) {

        if (respuesta === null) {

            throw new Error(

                "Pregunta desconocida:\n\n" +

                pregunta

            );

        }

    }

}

module.exports = new Validador();