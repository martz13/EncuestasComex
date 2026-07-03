class Espera {

    constructor(page) {

        this.page = page;

    }

    async cambioPregunta(anterior) {

        await this.page.waitForFunction(

            (pregunta) => {

                const p = document.querySelector(

                    "p.fw-bold1"

                );

                if (!p) return false;

                return p.innerText.trim() != pregunta;

            },

            anterior

        );

    }

}

module.exports = Espera;