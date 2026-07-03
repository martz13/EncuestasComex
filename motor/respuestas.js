const { obtenerRespuesta } = require("../preguntas");

const { comentarioAleatorio } = require("../comentarios");

class Respuestas {

    obtener(pregunta, page) {

        return obtenerRespuesta(

            page,

            pregunta

        );

    }

    comentario() {

        return comentarioAleatorio();

    }

}

module.exports = Respuestas;