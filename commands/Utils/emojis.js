const Command = require("../../structure/Command.js");

class Emojis extends Command {
    constructor() {
        super({
            name: 'emojis',
            aliases: ['emotes'],
            category: 'utils',
            description: 'Pour voir les emojis de votre serveur.',
            usage: 'emojis'
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

        const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTitle(language("EMOJIS_TITLE"))
        .setDescription(message.guild.emojis.cache.map(emoji =>`${emoji}` ).join(" ").slice(0,2000))
        .setTimestamp()
        .setFooter(client.footer);
    
        message.channel.send(embed);
    }
}

module.exports = new Emojis;