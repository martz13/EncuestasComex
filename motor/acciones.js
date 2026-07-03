class Acciones {

    constructor(page) {

        this.page = page;

    }

    async escribirCorreo(correo) {

        await this.page
            .locator('input[type="email"]')
            .fill(correo);

    }

    async aceptarTerminos() {

        await this.page
            .locator("#termino")
            .check();

    }

    async iniciarEncuesta() {

        await this.page
            .getByRole("button", {

                name: "Realizar encuesta"

            })
            .click();

    }

    async responderOpcion(respuesta) {

        await this.page
            .locator("label.btn")
            .filter({

                hasText: respuesta

            })
            .first()
            .click();

    }

    async escribirComentario(texto) {

        await this.page
            .locator(
                'input[type="text"], textarea'
            )
            .first()
            .fill(texto);

    }

    async finalizar() {

        await this.page
            .getByRole("button", {

                name: "Siguiente"

            })
            .click();

    }

}

module.exports = Acciones;