const Command = require("../../structure/Command.js");

class Volume extends Command {
    constructor() {
        super({
            name: 'volume',
            aliases: ['vol', 'set-vol'],
            category: 'music',
            description: 'Permet de mettre en pause la musique.',
            usage: 'pause'
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

        if (!message.member.voice.channel) {
         return message.channel.send({embed: {color: '0xFF0000', description: language("MUSIC_CHANNEL_VOCAL") }})
        }

        if (!client.player.getQueue(message)) return message.channel.send({embed: {color: '0xFF0000', description: language("MUSIC_ERROR_1") }})
      
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
         return message.channel.send({embed: {color: '0xFF0000', description: language("PLAY_ALREADYPLAYMUSIC") }})
        }

        if (!args[1]) return message.channel.send({embed: {color: '0xFF0000', description: language("SET_VOLUME_NUMBER") }})

        if (isNaN(args[0]) || 100 < args[0] || args[0] <= 0) return message.channel.send({embed: {color: '0xFF0000', description: language("SET_VOLUME_NUMBER_VALIDE") }})
        if (message.content.includes('-') || message.content.includes('+') || message.content.includes(',') || message.content.includes('.')) return message.channel.send({embed: {color: '0xFF0000', description: language("SET_VOLUME_NUMBER_VALIDE") }})

        client.player.setVolume(message, parseInt(args.slice(1).join(' ')));

        return message.channel.send({embed: {color: '0x00FF46', description: language("SET_VOLUME_SUCESS", args.slice(1).join(' ')) }})
    }
}

module.exports = new Volume;