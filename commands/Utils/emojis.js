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

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTitle(language("EMOJIS_TITLE"))
        .setDescription(message.guild.emojis.cache.map(emoji =>`${emoji}` ).join(" ").slice(0,2000))
        .setTimestamp()
        .setFooter(client.footer,  client.user.displayAvatarURL({format: 'png'}));
    
        message.channel.send({ embeds: [embed] });
    }
}

module.exports = new Emojis;