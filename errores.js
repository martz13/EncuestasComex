const fs = require("fs");
const path = require("path");

const { fechaArchivo } = require("./utils");

async function manejarError(page, error) {
    console.error("Error detectado:", error.message);

    // Verificamos que la página siga existiendo antes de tomar captura
    if (page && !page.isClosed()) {
        try {
            const carpeta = path.join(__dirname, "capturas");
            if (!fs.existsSync(carpeta)) {
                fs.mkdirSync(carpeta, { recursive: true });
            }
            const archivo = path.join(carpeta, `${fechaArchivo()}.png`);
            await page.screenshot({ path: archivo, fullPage: true });
            console.log("Captura guardada:", archivo);
        } catch (e) {
            console.log("No se pudo tomar la captura: el navegador ya la había cerrado.");
        }
    } else {
        console.log("No se pudo tomar la captura porque la página ya estaba cerrada.");
    }
}

module.exports = {

    manejarError

};