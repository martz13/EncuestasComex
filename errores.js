const fs = require("fs");
const path = require("path");

const { fechaArchivo } = require("./utils");

async function manejarError(page, error) {

    console.error(error.message);

    const carpeta = path.join(
        __dirname,
        "capturas"
    );

    if (!fs.existsSync(carpeta)) {

        fs.mkdirSync(carpeta, {
            recursive: true
        });

    }

    const archivo = path.join(

        carpeta,

        `${fechaArchivo()}.png`

    );

    await page.screenshot({

        path: archivo,

        fullPage: true

    });

    console.log(
        "Captura:",
        archivo
    );

}

module.exports = {

    manejarError

};