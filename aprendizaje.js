const fs = require("fs");
const path = require("path");

const { fechaHumana } = require("./utils");

const archivo = path.join(
    __dirname,
    "logs",
    "preguntas_pendientes.txt"
);

function registrarPregunta(pregunta, url) {

    if (!fs.existsSync(path.dirname(archivo))) {
        fs.mkdirSync(path.dirname(archivo), {
            recursive: true
        });
    }

    const texto = `=========================================
Fecha: ${fechaHumana()}

Pregunta:
${pregunta}

URL:
${url}

=========================================

`;

    fs.appendFileSync(
        archivo,
        texto,
        "utf8"
    );

}

module.exports = {
    registrarPregunta
};