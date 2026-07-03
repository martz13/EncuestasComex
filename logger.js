const config = require("./config");

class Logger {

    constructor() {

        this.debug = config.DEBUG;

    }

    hora() {

        return new Date().toLocaleTimeString();

    }

    info(texto) {

        if (!this.debug) return;

        console.log(`ℹ️  [${this.hora()}] ${texto}`);

    }

    ok(texto) {

        console.log(`✅ [${this.hora()}] ${texto}`);

    }

    warn(texto) {

        console.log(`⚠️  [${this.hora()}] ${texto}`);

    }

    error(texto) {

        console.log(`❌ [${this.hora()}] ${texto}`);

    }

    linea() {

        if (!this.debug) return;

        console.log("────────────────────────────────────────────");

    }

    titulo(texto) {

        console.log("");

        console.log("════════════════════════════════════════════");

        console.log(texto);

        console.log("════════════════════════════════════════════");

    }

}

module.exports = new Logger();