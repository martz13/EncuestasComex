const comentarios = [

    "Excelente atención.",

    "Todo muy bien.",

    "Excelente servicio.",

    "Muy satisfecho.",

    "Todo perfecto.",

    "Muy buena experiencia.",

    "Excelente trato.",

    "Muy buena atención.",

    "Todo excelente.",

    "Sin comentarios, todo bien."

];

function comentarioAleatorio() {

    return comentarios[
        Math.floor(Math.random() * comentarios.length)
    ];

}

module.exports = {
    comentarioAleatorio
};