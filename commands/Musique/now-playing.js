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

        const track = await queue.current
        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        return message.channel.send({
            embeds: [{
                color: client.color,
                author: { name: track.title },
                footer: { text: client.footer },
                fields: [
                    { name: language("NOW_PLAYING_CHANNEL"), value: track.author },
                    { name: language("NOW_FORMPLAYLIST"), value: track.fromPlaylist ? 'Yes' : 'No' },
                    { name: language("NOW_PROGRESSBAR"), value: progress }
                ],
                thumbnail: { url: track.thumbnail },
                timestamp: new Date(),
            }],
        });
    }
}

module.exports = new NowPlaying;