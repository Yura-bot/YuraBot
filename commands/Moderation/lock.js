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

        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(language("MISSING_PERMISSION_MANAGE_MESSAGES"));

        let ifChannelLock = client.mod.has(`${message.channel.id}-lock`)

        if (ifChannelLock === false) {

            const obj = {
                id: message.channel.id
            }

            message.channel.createOverwrite(message.guild.id, {
                SEND_MESSAGES: false
            }).catch(error => {});

            client.mod.set(`${message.channel.id}-lock`, obj);
    
            return message.channel.send(`${language("LOCK_MESSAGE_1")}${message.author.username}${language("LOCK_MESSAGE_2")}`);

        } else {
            message.channel.send(language("LOCK_ALREADYLOCKED"));
        }
    }
}

module.exports = new Lock;