const { obtenerRespuesta } = require("./preguntas");
const { comentarioAleatorio } = require("./comentarios");

/**
 * Obtiene el texto de la pregunta actual.
 */
async function obtenerPregunta(page) {

    return (
        await page
            .locator("p.fw-bold1")
            .first()
            .innerText()
    ).trim();

}

/**
 * Espera a que cambie la pregunta.
 */
async function esperarCambioPregunta(page, preguntaAnterior) {

    await page.waitForFunction(

        (pregunta) => {

            const elemento = document.querySelector("p.fw-bold1");

            if (!elemento) return false;

            return elemento.innerText.trim() !== pregunta;

        },

        preguntaAnterior

    );

}

/**
 * Responde la pregunta actual.
 */
async function responderPregunta(page) {

    const pregunta = await obtenerPregunta(page);

    console.log("Pregunta:", pregunta);

    const cajaTexto = page.locator(
        'input[type="text"], textarea'
    );

    if (await cajaTexto.count() > 0) {

        const comentario = comentarioAleatorio();

        console.log("Comentario:", comentario);

        await cajaTexto.first().fill(comentario);

        await page.getByRole("button", {

            name: "Siguiente"

        }).click();

        return;

    }

    const respuesta = obtenerRespuesta(
        page,
        pregunta
    );

    if (!respuesta) {

        throw new Error(

            "No existe una regla para:\n" + pregunta

        );

    }

    console.log("Respuesta:", respuesta);

    await page
        .locator("label.btn")
        .filter({

            hasText: respuesta

        })
        .first()
        .click();

}

module.exports = {

    responderPregunta,

    obtenerPregunta,

    esperarCambioPregunta

};