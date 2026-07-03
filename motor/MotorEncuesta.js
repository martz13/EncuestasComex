const Inteligencia = require("./Inteligencia");
const Temporizador = require("./Temporizador");
const validador = require("./Validador");

const debug = require("./LoggerDebug");

const {

    pausaAleatoria,

    pausaLectura

} = require("../utils");

const config = require("../config");

class MotorEncuesta {

    constructor(pagina, estadisticas, logger) {

        this.pagina = pagina;

        this.estadisticas = estadisticas;

        this.logger = logger;

        this.inteligencia = new Inteligencia();

        this.timer = new Temporizador();

    }

    async ejecutar() {

        const correo = this.inteligencia.generarCorreo();

        this.estadisticas.agregarCorreo(correo);

        debug.correo(correo);

        await this.pagina.abrir(config.URL);

        await pausaAleatoria(config);

        await this.pagina.escribirCorreo(correo);

        await pausaAleatoria(config);

        await this.pagina.aceptarTerminos();

        await pausaAleatoria(config);

        await this.pagina.iniciarEncuesta();

        while (true) {

            const pregunta = await this.pagina.obtenerPregunta();

            debug.pregunta(pregunta);

            await pausaLectura(config);

            if (await this.pagina.esPreguntaAbierta()) {

                const comentario = this.inteligencia.generarComentario();

                debug.comentario(comentario);

                await this.pagina.escribirComentario(comentario);

                await pausaAleatoria(config);

                await this.pagina.finalizarEncuesta();

                break;

            }

            this.timer.iniciar();

            const respuesta = this.inteligencia.obtenerRespuesta(

                this.pagina.page,

                pregunta

            );

            validador.validarRespuesta(

                respuesta,

                pregunta

            );

            debug.respuesta(respuesta);

            await this.pagina.responder(respuesta);

            const tiempo = this.timer.finalizar();

            debug.tiempo(tiempo);

            await this.pagina.esperarNuevaPregunta(pregunta);

            await pausaAleatoria(config);

        }

    }

}

module.exports = MotorEncuesta;