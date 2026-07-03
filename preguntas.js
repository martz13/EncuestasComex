const { registrarPregunta } = require("./aprendizaje");

const reglas = [

    {
        contiene: ["satisfecho"],
        responder: "10"
    },

    {
        contiene: ["recomendar"],
        responder: "10"
    },

    {
        contiene: ["regres"],
        responder: "SI"
    },

    {
        contiene: ["interés", "interes"],
        responder: "SI"
    },

    {
        contiene: ["complement"],
        responder: "SI"
    }

];

function obtenerRespuesta(page, pregunta) {

    const texto = pregunta.toLowerCase();

    for (const regla of reglas) {

        for (const palabra of regla.contiene) {

            if (
                texto.includes(
                    palabra.toLowerCase()
                )
            ) {

                return regla.responder;

            }

        }

    }

    registrarPregunta(
        pregunta,
        page.url()
    );

    return null;

}

module.exports = {
    obtenerRespuesta
};