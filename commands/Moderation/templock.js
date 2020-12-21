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

    async run(client, message, args) {

        const Discord = require("discord.js");
        const ms = require('ms');

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

        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(language("MISSING_PERMISSION_MANAGE_MESSAGES"));

        let ifChannelLock = client.mod.has(`${message.channel.id}-lock`)

        if (ifChannelLock === false) {

            let time = args[1];
            if (!time && isNaN(time)) return message.reply(language("TIMELOCK_ERROR_TIME"));

            const obj = {
                id: message.channel.id
            }

            message.channel.createOverwrite(message.guild.id, {
                SEND_MESSAGES: false
            }).catch(error => {});

            client.mod.set(`${message.channel.id}-lock`, obj);
    
            message.channel.send(`${language("LOCK_MESSAGE_1")}${message.author.username}${language("LOCK_MESSAGE_2")}`);

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