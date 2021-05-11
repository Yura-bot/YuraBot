const Command = require("../../structure/Command.js");

class TempLock extends Command {
    constructor() {
        super({
            name: 'templock',
            aliases: ['vérouiller-temp'],
            category: 'mod',
            description: 'Permet de vérouiller temporairement un salon.',
            usage: 'templock'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");
        const ms = require('ms');

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(language("MISSING_PERMISSION_MANAGE_MESSAGES"));

        let ifChannelLock = message.channel.permissionsFor(message.guild.roles.everyone).toArray().includes('SEND_MESSAGES')

        if (ifChannelLock) {

            let time = args[1];
            if (!time && isNaN(time)) return message.reply(language("TIMELOCK_ERROR_TIME"));

            message.channel.createOverwrite(message.guild.id, {
                SEND_MESSAGES: false
            }).catch(error => {});

            message.channel.send(language("LOCK_MESSAGE").replace("${mod}", message.author.username));

            setTimeout(() => {
                message.channel.createOverwrite(message.guild.id, {
                  SEND_MESSAGES: null
                }).then(message.channel.send(language("UNLOCK_MESSAGE"))).catch(error => {});
                client.mod.delete(`${message.channel.id}-lock`);
            }, ms(time));


        } else {
            message.channel.send(language("LOCK_ALREADYLOCKED"));
        }
    }
}

module.exports = new TempLock;