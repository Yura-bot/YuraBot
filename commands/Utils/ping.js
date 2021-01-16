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

    async run(client, message, args, db) {

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        await message.channel.send(client.getEmoji(client.config.emojis.loading)+language("PING_BEFORE")).then(msg => {
            msg.edit(client.getEmoji(client.config.emojis.online)+language("PING_AFTER")+Math.sqrt(((new Date() - message.createdTimestamp)/(5*2))**2)+" ms`.").catch(e => {
                return client.emit('error',e);
            });
        }).catch(e => {
            return client.emit('error',e);
        });
    }
}

module.exports = new Ping;