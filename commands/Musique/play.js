const Command = require("../../structure/Command.js");

class Play extends Command {
    constructor() {
        super({
            name: 'play',
            aliases: ['joue'],
            category: 'music',
            description: 'Permet de jouer une musique dans votre salon.',
            usage: 'play'
        });
    }

    async run(client, message, args) {

        const Discord = require("discord.js");

        let guildSettingsExist = client.guildSettings.has(`${message.guild.id}`)

        let prefix;
        let guildLanguage;

        if (guildSettingsExist) {
            prefix = client.guildSettings.get(`${message.guild.id}`, "prefix")
            guildLanguage = client.guildSettings.get(`${message.guild.id}`, "lang")
        } else {
            prefix = client.default_prefix;
            guildLanguage = "english"
        }

        const language = require(`../../languages/${guildLanguage}`);

        client.player.play(message, args[1]);
    }
}

module.exports = new Play;