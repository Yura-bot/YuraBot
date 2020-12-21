const Command = require("../../structure/Command.js");

class Queue extends Command {
    constructor() {
        super({
            name: 'queue',
            aliases: [''],
            category: 'music',
            description: 'Permet de voir la liste des musiques en attentes.',
            usage: 'queue'
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

        const queue = client.player.getQueue(message);

        if (!queue) return message.channel.send({embed: {color: '0xFF0000', description: language("MUSIC_ERROR_1") }})

        return message.channel.send({embed: {color: '0x00FF46', description: `🎞 Queue : \n\n ${language("QUEUE_QUEUE_IN_PROGRESS")} : ${queue.playing.title} | ${queue.playing.author} \n \n ` +

        queue.tracks.map((track, i) => {
           return `**#${i+1}** - ${track.title} | ${track.author} (${language("QUEUE_REQUESTBY")} : ${track.requestedBy.username})`
        }).join('\n')

       }}).catch(e => {
        return message.channel.send(language("QUEUE_NOQUEUE"));
    });

    }
}

module.exports = new Queue;