const Command = require("../../structure/Command.js");

class Qrcode extends Command {
    constructor() {
        super({
            name: 'qrcode',
            aliases: ['qr'],
            category: 'utils',
            description: 'Permet de crée un qrcode avec le bot.',
            usage: 'qrcode [lien]'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        let arg = message.content.split(" ").slice(1);
        let contenu = arg.join(" ");
        if (!args[1]) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_QRCODE"));

        const qrcode = new Discord.MessageEmbed()
            .setTitle("📌 __Qrcode :__") 
            .setColor(client.color)
            .setDescription(language("QRCODE_DESC") + contenu)
            .setImage('https://api.qrserver.com/v1/create-qr-code/?data=' + contenu)
            .setTimestamp()
            .setFooter(client.footer);

        message.channel.send(qrcode).catch(e => {
            return message.channel.send(language("QRCODE_ERROR"));
        });
    }
}

module.exports = new Qrcode;