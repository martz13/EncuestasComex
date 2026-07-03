class Temporizador {

    constructor() {

        this.inicio = 0;

    }

    iniciar() {

        this.inicio = Date.now();

    }

    finalizar() {

        return Date.now() - this.inicio;

    }

}

module.exports = Temporizador;