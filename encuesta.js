const BotEncuestas = require("./bot/BotEncuestas");

(async () => {

    const bot = new BotEncuestas();

    await bot.iniciar();

    await bot.ejecutar();

    await bot.finalizar();

})();