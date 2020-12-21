const Command = require("../../structure/Command.js");

class NowPlaying extends Command {
    constructor() {
        super({
            name: 'now-playing',
            aliases: ['np'],
            category: 'music',
            description: "Permet de voir la musique qui est en cour d'écoute.",
            usage: 'resume'
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

        const track = await client.player.nowPlaying(message);

        return message.channel.send({
            embed: {
                color: client.color,
                author: { name: track.title },
                footer: { text: client.footer },
                fields: [
                    { name: language("NOW_PLAYING_CHANNEL"), value: track.author, inline: true },
                    { name: language("QUEUE_REQUESTBY"), value: track.requestedBy.username, inline: true },
                    { name: language("NOW_FORMPLAYLIST"), value: track.fromPlaylist ? 'Yes' : 'No', inline: true },
                    { name: language("NOW_PROGRESSBAR"), value: client.player.createProgressBar(message, { timecodes: true }), inline: true }
                ],
                thumbnail: { url: track.thumbnail },
                timestamp: new Date(),
            },
        });
    }
}

module.exports = new NowPlaying;