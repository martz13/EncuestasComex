const { chromium } = require("playwright");

const config = require("../config");

const logger = require("../logger");

const Estadisticas = require("../motor/estadisticas");
const EncuestaPage = require("../pages/EncuestaPage");
const MotorEncuesta = require("../motor/MotorEncuesta");

const { manejarError } = require("../errores");

const {

    esperar,

    numeroAleatorio

} = require("../utils");

class BotEncuestas {

    constructor() {

        this.browser = null;

        this.page = null;

        this.estadisticas = new Estadisticas();

    }

    async iniciar() {

        logger.titulo("BOT DE ENCUESTAS");

        this.browser = await chromium.launch({

            headless: config.HEADLESS,

            slowMo: config.SLOW_MO

        });

        this.page = await this.browser.newPage();

        this.page.setDefaultTimeout(

            config.TIMEOUT

        );

    }

    async ejecutar() {

        for (

            let i = 1;

            i <= config.TOTAL_ENCUESTAS;

            i++

        ) {

            logger.titulo(

                `ENCUESTA ${i}/${config.TOTAL_ENCUESTAS}`

            );

            let completada = false;

            for (

                let intento = 1;

                intento <= config.REINTENTOS + 1;

                intento++

            ) {

                try {

                    const pagina = new EncuestaPage(this.page);
                    const motor = new MotorEncuesta(pagina, this.estadisticas, logger);

                    this.estadisticas.iniciarEncuesta();
                    await motor.ejecutar();
                    this.estadisticas.finalizarEncuesta(true);

                    completada = true;

                    break;

                }

                catch (error) {

                    logger.warn(

                        `Intento ${intento} falló`

                    );

                    await manejarError(

                        this.page,

                        error

                    );

                }

            }

            if (

                !completada

            ) {

                this.estadisticas.finalizarEncuesta(false);

            }

            if (

                i < config.TOTAL_ENCUESTAS

            ) {

                const tiempo = numeroAleatorio(

                    config.ESPERA_ENTRE_ENCUESTAS.MIN,

                    config.ESPERA_ENTRE_ENCUESTAS.MAX

                );

                logger.ok(

                    `Esperando ${tiempo} ms`

                );

                await esperar(

                    tiempo

                );

            }

        }

    }

    async finalizar() {

        await this.browser.close();

        logger.titulo("RESUMEN");

        console.table(

            this.estadisticas.resumen()

        );

    }

}

module.exports = BotEncuestas;