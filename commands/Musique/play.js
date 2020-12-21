const Command = require("../../structure/Command.js");

class Play extends Command {
    constructor() {
        super({
            name: 'play',
            aliases: ['joue'],
            category: 'music',
            description: 'Permet de jouer une musique dans votre salon.',
            usage: 'play'
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

        if (!args[1]) return message.channel.send({embed: {color: '0xFF0000', description: language("PLAY_NO_REQUEST") }})

        if (!message.member.voice.channel) {
         return message.channel.send({embed: {color: '0xFF0000', description: language("MUSIC_CHANNEL_VOCAL") }})
        }
      
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
         return message.channel.send({embed: {color: '0xFF0000', description: language("PLAY_ALREADYPLAYMUSIC") }})
        }

        return client.player.play(message, args.slice(1).join(' '));
    }
}

module.exports = new Play;