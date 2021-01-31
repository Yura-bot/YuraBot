const Command = require("../../structure/Command.js");

class Config extends Command {
    constructor() {
        super({
            name: 'config',
            aliases: ['configuration'],
            category: 'admin',
            description: "Affiche un message pour savoir ou configurer le bot.",
            usage: 'config'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        message.channel.send(language("DASHCONFIG")).catch(e => {})
    }
}

module.exports = new Config;