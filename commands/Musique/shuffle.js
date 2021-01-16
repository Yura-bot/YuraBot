const Command = require("../../structure/Command.js");

class Shuffle extends Command {
    constructor() {
        super({
            name: 'shuffle',
            aliases: [''],
            category: 'music',
            description: 'Permet de mélanger la queue.',
            usage: 'shuffle'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if (!message.member.voice.channel) {
         return message.channel.send({embed: {color: '0xFF0000', description: language("MUSIC_CHANNEL_VOCAL") }})
        }

        if (!client.player.getQueue(message)) return message.channel.send({embed: {color: '0xFF0000', description: language("MUSIC_ERROR_1") }})
      
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
         return message.channel.send({embed: {color: '0xFF0000', description: language("PLAY_ALREADYPLAYMUSIC") }})
        }

        client.player.shuffle(message);

        return message.channel.send({embed: {color: '0x00FF46', description: language("QUEUE_SHUFFLE", client.player.getQueue(message).tracks.length) }})
    }
}

module.exports = new Shuffle;