class Estadisticas {

    constructor() {

        this.inicio = Date.now();

        this.tiempos = [];

        this.exitosas = 0;

        this.fallidas = 0;

        this.correos = [];

        this.preguntasNuevas = 0;

        this.capturas = 0;

    }

    iniciarEncuesta() {

        this.inicioEncuesta = Date.now();

    }

    finalizarEncuesta(ok = true) {

        const tiempo = Date.now() - this.inicioEncuesta;

        this.tiempos.push(tiempo);

        if (ok)

            this.exitosas++;

        else

            this.fallidas++;

    }

    agregarCorreo(correo) {

        this.correos.push(correo);

    }

    agregarPreguntaNueva() {

        this.preguntasNuevas++;

    }

    agregarCaptura() {

        this.capturas++;

    }

    resumen() {

        const total = this.tiempos.reduce((a, b) => a + b, 0);

        return {

            exitosas: this.exitosas,

            fallidas: this.fallidas,

            promedio: this.tiempos.length
                ? (total / this.tiempos.length / 1000).toFixed(2)
                : 0,

            maxima: this.tiempos.length
                ? (Math.max(...this.tiempos) / 1000).toFixed(2)
                : 0,

            minima: this.tiempos.length
                ? (Math.min(...this.tiempos) / 1000).toFixed(2)
                : 0,

            total: (total / 1000).toFixed(2),

            correos: this.correos.length,

            preguntasNuevas: this.preguntasNuevas,

            capturas: this.capturas

        };

    }

}

module.exports = Estadisticas;