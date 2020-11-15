const Command = require("../../structure/Command.js");

class Ping extends Command {
    constructor() {
        super({
            name: 'ping',
            aliases: ['latence'],
            category: 'utils',
            description: 'Affiche la latence du robot en temps réel.',
            usage: 'ping'
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

        await message.channel.send(client.getEmoji(client.config.emojis.online)+language("PING_BEFORE")).then(msg => {
            msg.edit(client.getEmoji(client.config.emojis.online)+language("PING_AFTER")+Math.sqrt(((new Date() - message.createdTimestamp)/(5*2))**2)+" ms`.").catch(e => {
                return client.emit('error',e);
            });
        }).catch(e => {
            return client.emit('error',e);
        });
    }
}

module.exports = new Ping;