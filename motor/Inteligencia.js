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
        return lista[Math.floor(Math.random() * lista.length)];
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
        return this.aleatorio(this.comentarios);
    }

    normalizarTexto(texto) {
        if (!texto) return "";
        return texto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // Quita acentos
            .toLowerCase();
    }

    obtenerRespuesta(page, pregunta) {
        const texto = this.normalizarTexto(pregunta);

        for (const regla of this.reglas) {
            for (const palabra of regla.contiene) {
                const palabraNormalizada = this.normalizarTexto(palabra);
                if (texto.includes(palabraNormalizada)) {
                    // Aquí estaba el bug: tu JSON usa "respuesta", no "responder"
                    return regla.respuesta;
                }
            }
        }

        registrarPregunta(pregunta, page.url());
        return null;
    }

}

module.exports = Inteligencia;