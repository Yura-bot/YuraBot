const Command = require("../../structure/Command.js");

class Ping extends Command {
    constructor() {
        super({
            name: 'ping',
            aliases: ['latence'],
            category: 'utils',
            description: 'Affiche la latence du robot en temps réel.',
            usage: 'ping'
        });
    }

    async run(client, message, args, db) {

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        return await message.channel.send(client.config.emojis.online+language("PING_AFTER")+client.ws.ping+" ms`.")
    }
}

module.exports = new Ping;