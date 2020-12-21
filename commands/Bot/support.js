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

        const support = new Discord.MessageEmbed()
        .setDescription(language("SUPPORT_DESC"))
        .addField(language("SUPPORT_FIELD"), "https://discord.gg/etQ3uJN")
        .setColor(client.color)

       return message.channel.send(support);
    }
}

module.exports = new Support;