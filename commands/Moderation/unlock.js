const Command = require("../../structure/Command.js");

class UnLock extends Command {
    constructor() {
        super({
            name: 'unlock',
            aliases: ['dévérouiller'],
            category: 'mod',
            description: 'Permet de dévérouiller un salon.',
            usage: 'unlock'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply(language("MISSING_PERMISSION_MANAGE_MESSAGES"));

        let ifChannelLock = message.channel.permissionsFor(message.guild.roles.everyone).toArray().includes('SEND_MESSAGES')

        if (ifChannelLock === false) {

            message.channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: true }).catch(error => {});
            return message.channel.send(language("UNLOCK_MESSAGE"));

        } else {
            message.channel.send(language("UNLOCK_NOLOCKED"));
        }
    }
}

module.exports = new UnLock;