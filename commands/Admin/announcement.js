const Command = require("../../structure/Command.js");

class Announcement extends Command {
    constructor() {
        super({
            name: 'announcement',
            aliases: ['annonce', 'brodcast', 'ann'],
            category: 'admin',
            description: 'Permet de crée une annonce.',
            usage: 'announcement [Description]'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if(!message.member.permissions.has("ADMINISTRATOR")) {
            var error_permissions = new Discord.MessageEmbed()
                .setDescription(language("MISSING_PERMISSION_ADMINISTRATOR"))
                .setColor("#F43436")
            return message.channel.send(error_permissions)
        }

        if (message.member.permissions.has("ADMINISTRATOR")) {

            let attachments = message.attachments.first();

            if (!attachments) {

                let contenu = args.slice(1).join(' ');
                if (!args[1]) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_ANNONCE"))
    
                const annonce = new Discord.MessageEmbed()
                    .setTitle(language("ANNONCE_TITLE"))
                    .setDescription(contenu)
                    .setColor("#BE1931")
    
                return message.channel.send({ embeds: [annonce] }).catch(e => {});

            }

            let contenu = args.slice(1).join(' ');
            if (!args[1]) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_ANNONCE"))

            const annonce = new Discord.MessageEmbed()
                .setTitle(language("ANNONCE_TITLE"))
                .setDescription(contenu)
                .setImage(attachments.attachment)
                .setColor("#BE1931")

            return message.channel.send({ embeds: [annonce] }).catch(e => {});
        }
    }
}

module.exports = new Announcement;