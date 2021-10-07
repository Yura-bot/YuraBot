const Command = require("../../structure/Command.js");

class Stop extends Command {
    constructor() {
        super({
            name: 'stop',
            aliases: [''],
            category: 'music',
            description: 'Permet de stoper la musique.',
            usage: 'stop'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if (!message.member.voice.channel) {
         return message.channel.send({embeds: [{color: '0xFF0000', description: language("MUSIC_CHANNEL_VOCAL") }]})
        }

        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({embeds: [{color: '0xFF0000', description: language("MUSIC_ERROR_1") }]})
      
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
         return message.channel.send({embeds: [{color: '0xFF0000', description: language("PLAY_ALREADYPLAYMUSIC") }]})
        }

        queue.setRepeatMode(0);
        queue.destroy();

        return message.channel.send({embeds: [{color: '0x00FF46', description: language("STOP_STOP") }]})
    }
}

module.exports = new Stop;