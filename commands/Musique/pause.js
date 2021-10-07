const Command = require("../../structure/Command.js");

class Pause extends Command {
    constructor() {
        super({
            name: 'pause',
            aliases: [''],
            category: 'music',
            description: 'Permet de mettre en pause la musique.',
            usage: 'pause'
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

        queue.setPaused(true);

        return message.channel.send({embeds: [{color: '0x00FF46', description: language("PAUSE_PAUSE") }]})
    }
}

module.exports = new Pause;