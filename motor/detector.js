class Detector {

    constructor(page) {
        this.page = page;
    }

    async obtenerPregunta() {

        return (
            await this.page
                .locator("p.fw-bold1")
                .first()
                .innerText()
        ).trim();

    }

    async esPreguntaAbierta() {

        const cajas = this.page.locator(
            'input[type="text"], textarea'
        );

        return await cajas.count() > 0;

    }

    async obtenerCajaTexto() {

        return this.page.locator(
            'input[type="text"], textarea'
        ).first();

    }

}

module.exports = Detector;