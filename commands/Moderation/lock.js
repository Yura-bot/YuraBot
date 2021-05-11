const Command = require("../../structure/Command.js");

class Lock extends Command {
    constructor() {
        super({
            name: 'lock',
            aliases: ['vérouiller'],
            category: 'mod',
            description: 'Permet de vérouiller un salon.',
            usage: 'lock'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(language("MISSING_PERMISSION_MANAGE_MESSAGES"));

        let ifChannelLock = message.channel.permissionsFor(message.guild.roles.everyone).toArray().includes('SEND_MESSAGES')

        if (ifChannelLock) {

            message.channel.createOverwrite(message.guild.id, {
                SEND_MESSAGES: false
            }).catch(error => {});
    
            return message.channel.send(language("LOCK_MESSAGE").replace("${mod}", message.author.username));

        } else {
            message.channel.send(language("LOCK_ALREADYLOCKED"));
        }
    }
}

module.exports = new Lock;