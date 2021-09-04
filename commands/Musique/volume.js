const Command = require("../../structure/Command.js");

class Volume extends Command {
    constructor() {
        super({
            name: 'volume',
            aliases: ['vol', 'set-vol'],
            category: 'music',
            description: 'Permet de modifier le volume de la musique.',
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

        if (!args[1]) return message.channel.send({embed: {color: '0xFF0000', description: language("SET_VOLUME_NUMBER") }})

        if (isNaN(args[1]) || 100 < args[1] || args[1] <= 0) return message.channel.send({embed: {color: '0xFF0000', description: language("SET_VOLUME_NUMBER_VALIDE") }})
        if (message.content.includes('-') || message.content.includes('+') || message.content.includes(',') || message.content.includes('.')) return message.channel.send({embed: {color: '0xFF0000', description: language("SET_VOLUME_NUMBER_VALIDE") }})

        client.player.setVolume(message, parseInt(args.slice(1).join(' ')));

        return message.channel.send({embed: {color: '0x00FF46', description: language("SET_VOLUME_SUCESS").replace("{vol}", args.slice(1).join(' ')) }})
    }
}

module.exports = new Volume;