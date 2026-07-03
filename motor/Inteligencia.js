const { registrarPregunta } = require("../aprendizaje");

class Inteligencia {

    constructor() {
        this.correos = new Set();
        this.reglas = [

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

        this.comentarios = [

            "Todo excelente.",
            "Muy buena atención.",
            "Excelente servicio.",
            "Todo muy bien.",
            "Sin comentarios.",
            "Muy satisfecho.",
            "Excelente atención.",
            "Buen servicio.",
            "Todo correcto.",
            "Muy recomendable."

        ];

        this.nombres = [

            "juan", "pedro", "miguel", "manuel", "luis",
            "mario", "carlos", "fernando", "roberto", "jose",
            "ana", "maria", "laura", "karla", "gabriela",
            "paola", "monica", "adriana", "patricia", "diana"

        ];

        this.apellidos = [

            "garcia", "martinez", "lopez", "hernandez",
            "gonzalez", "torres", "ramirez", "morales",
            "cruz", "castillo", "vargas", "ortega"

        ];

        this.dominios = [

            "gmail.com",
            "hotmail.com",
            "outlook.com",
            "yahoo.com"

        ];

    }

    aleatorio(lista) {

        return lista[
            Math.floor(
                Math.random() * lista.length
            )
        ];

    }

    generarCorreo() {

        while (true) {

            const correo =

                `${this.aleatorio(this.nombres)}.` +

                `${this.aleatorio(this.apellidos)}` +

                `${Math.floor(1000 + Math.random() * 900000)}` +

                `@${this.aleatorio(this.dominios)}`;

            if (!this.correos.has(correo)) {

                this.correos.add(correo);

                return correo;

            }

        }

    }

    generarComentario() {

        return this.aleatorio(
            this.comentarios
        );

    }

    obtenerRespuesta(page, pregunta) {

        const texto = pregunta.toLowerCase();

        for (const regla of this.reglas) {

            for (const palabra of regla.contiene) {

                if (texto.includes(palabra)) {

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

}

module.exports = Inteligencia;