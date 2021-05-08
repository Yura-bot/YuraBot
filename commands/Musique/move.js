const Command = require("../../structure/Command.js");

class Move extends Command {
    constructor() {
        super({
            name: 'move',
            aliases: ['moveTo'],
            category: 'music',
            description: 'Permet de déplacer le bot dans un autre salon vocal.',
            usage: 'move [Voice channel]'
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
      
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
         return message.channel.send({embed: {color: '0xFF0000', description: language("PLAY_ALREADYPLAYMUSIC") }})
        }

        let toMoveChannel = message.guild.channels.cache.get(args[1])
        if (!toMoveChannel || toMoveChannel.type != 'voice') return message.channel.send({embed: {color: '0xFF0000', description: language("SYNTAXE_MOVETO") }})

        try {
            client.player.moveTo(message, toMoveChannel);
            return message.channel.send({embed: {color: '0x00FF46', description: language("MOVETO_SUCESS").replace("{channel}", toMoveChannel.name) }})
        } catch (e) {
            message.channel.send({embed: {color: '0xFF0000', description: language("MOVETO_ERROR") }})
        }
    }
}

module.exports = new Move;