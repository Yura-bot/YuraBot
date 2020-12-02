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

        if (!client.lockit) client.lockit = [];
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return msg.reply(language("MISSING_PERMISSION_MANAGE_MESSAGES"));

        let ifChannelLock = client.mod.has(`${message.channel.id}-lock`)

        if (ifChannelLock) {

            message.channel.updateOverwrite(message.guild.id, { SEND_MESSAGES: true }).catch(error => {});

            client.mod.delete(`${message.channel.id}-lock`);
    
            return message.channel.send(language("UNLOCK_MESSAGE"));

        } else {
            message.channel.send(language("UNLOCK_NOLOCKED"));
        }
    }
}

module.exports = new UnLock;