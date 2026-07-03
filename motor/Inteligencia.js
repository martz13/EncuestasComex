const { registrarPregunta } = require("../aprendizaje");

class Inteligencia {

    constructor() {
        this.correos = new Set();

        // Importando datos desde los recursos externos
        this.reglas = require("../resources/respuestas.json");
        this.comentarios = require("../resources/comentarios.json");
        this.nombres = require("../resources/nombres.json");
        this.apellidos = require("../resources/apellidos.json");
        this.dominios = require("../resources/dominios.json");
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