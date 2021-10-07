const Command = require("../../structure/Command.js");

class Support extends Command {
    constructor() {
        super({
            name: 'support',
            aliases: [''],
            category: 'bot',
            description: 'Vous donne des liens pour rejoindre le serveur de support le bot.',
            usage: 'support'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        const support = new Discord.MessageEmbed()
        .setDescription(language("SUPPORT_DESC"))
        .addField(language("SUPPORT_FIELD"), "https://discord.gg/etQ3uJN")
        .setColor(client.color)

       return message.channel.send({ embeds: [support] })
    }
}

module.exports = new Support;