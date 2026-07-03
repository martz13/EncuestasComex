const nombres = [

    "juan",
    "pedro",
    "luis",
    "miguel",
    "jose",
    "mario",
    "antonio",
    "manuel",
    "carlos",
    "eduardo",
    "fernando",
    "ricardo",
    "roberto",
    "daniel",
    "hector",

    "maria",
    "ana",
    "laura",
    "sofia",
    "patricia",
    "adriana",
    "alejandra",
    "monica",
    "gabriela",
    "karla",
    "elena",
    "diana",
    "claudia",
    "paola",
    "veronica"

];

const apellidos = [

    "garcia",
    "martinez",
    "lopez",
    "hernandez",
    "gonzalez",
    "rodriguez",
    "ramirez",
    "flores",
    "torres",
    "castillo",
    "vargas",
    "ortega",
    "morales",
    "cruz",
    "navarro"

];

const dominios = [

    "gmail.com",

    "hotmail.com",

    "outlook.com",

    "yahoo.com"

];

function aleatorio(lista) {

    return lista[
        Math.floor(
            Math.random() * lista.length
        )
    ];

}

function generarCorreo() {

    const nombre = aleatorio(nombres);

    const apellido = aleatorio(apellidos);

    const numero =

        Math.floor(

            Math.random() * 9999

        );

    const dominio =

        aleatorio(dominios);

    return `${nombre}.${apellido}${numero}@${dominio}`;

}

module.exports = {

    generarCorreo

};