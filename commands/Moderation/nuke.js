const Command = require("../../structure/Command.js");

class Nuke extends Command {
    constructor() {
        super({
            name: 'nuke',
            aliases: [],
            category: 'mod',
            description: 'Permet de supprimer tous les messages d\'un channel.',
            usage: 'ban [Membre] (Raison)'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            var error_permissions = new Discord.MessageEmbed()
                .setDescription(language("MISSING_PERMISSION_BAN_MEMBERS"))
                .setColor("#F43436")
             return message.channel.send(error_permissions)
        }

        try {
            message.channel.clone().then(msg => msg.send(language("NUKE_SUCESS")));
            message.channel.delete();
        } catch (error) {
            //
        }
    }
}

module.exports = new Nuke;