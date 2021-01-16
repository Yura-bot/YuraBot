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

        if(!message.member.hasPermission("ADMINISTRATOR")) {
            var error_permissions = new Discord.MessageEmbed()
                .setDescription(language("MISSING_PERMISSION_ADMINISTRATOR"))
                .setColor("#F43436")
            return message.channel.send(error_permissions)
        }

        if (message.member.hasPermission("ADMINISTRATOR")) {

            let attachments = message.attachments.array();

            if (attachments.length === 0) {

                let contenu = args.slice(1).join(' ');
                if (!args[1]) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_ANNONCE"))
    
                const annonce = new Discord.MessageEmbed()
                    .setTitle(language("ANNONCE_TITLE"))
                    .setDescription(contenu)
                    .setColor("#BE1931")
    
                return message.channel.send(annonce).catch(e => {});

            }

            let contenu = args.slice(1).join(' ');
            if (!args[1]) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_ANNONCE"))

            const annonce = new Discord.MessageEmbed()
                .setTitle(language("ANNONCE_TITLE"))
                .setDescription(contenu)
                .setImage(attachments[0].url)
                .setColor("#BE1931")

            return message.channel.send(annonce).catch(e => {});
        }
    }
}

module.exports = new Announcement;