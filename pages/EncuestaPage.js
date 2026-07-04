class EncuestaPage {

    constructor(page) {

        this.page = page;

    }

    async abrir(url) {

        await this.page.goto(url, {
            waitUntil: "networkidle"
        });

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

    async obtenerPregunta() {

        return (
            await this.page
                .locator("p.fw-bold,p.fw-bold1")
                .first()
                .innerText()
        ).trim();

    }

    async esPreguntaAbierta() {

        return await this.page
            .locator('input[type="text"],textarea')
            .count() > 0;

    }

    async escribirComentario(comentario) {

        await this.page
            .locator('input[type="text"],textarea')
            .first()
            .fill(comentario);

    }

    async responder(respuesta) {

        if (await this.intentarLabel(respuesta)) return;

        if (await this.intentarInput(respuesta)) return;

        if (await this.intentarRole(respuesta)) return;

        throw new Error(
            "No fue posible responder: " + respuesta
        );

    }

    async intentarLabel(respuesta) {

        const opcion = this.page.locator("label").filter({
            hasText: respuesta
        }).first();

        if (await opcion.count()) {

            await opcion.click();

            return true;

        }

        return false;

    }

    async intentarInput(respuesta) {

        const input = this.page.locator(
            `input[value="${respuesta}"]`
        ).first();

        if (await input.count()) {

            await input.check();

            return true;

        }

        return false;

    }

    async intentarRole(respuesta) {

        try {

            await this.page.getByRole("radio", {
                name: respuesta
            }).check();

            return true;

        }

        catch {

            return false;

        }

    }

    async finalizarEncuesta() {

        await this.page
            .getByRole("button", {
                name: "Siguiente"
            })
            .click();

    }

    async esperarNuevaPregunta(preguntaAnterior) {

        await this.page.waitForFunction(

            pregunta => {

                const p = document.querySelector(
                    "p.fw-bold,p.fw-bold1"
                );

                if (!p) return false;

                return p.innerText.trim() !== pregunta;

            },

            preguntaAnterior

        );

    }

    async esPreguntaAbierta() {
        // Agregamos :visible para no detectar inputs ocultos
        return await this.page
            .locator('input[type="text"]:visible, textarea:visible')
            .count() > 0;
    }

    async escribirComentario(comentario) {
        // Agregamos :visible para no escribir en inputs ocultos
        await this.page
            .locator('input[type="text"]:visible, textarea:visible')
            .first()
            .fill(comentario);
    }

}

module.exports = EncuestaPage;