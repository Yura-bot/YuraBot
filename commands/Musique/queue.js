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

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if (!message.member.voice.channel) {
         return message.channel.send({embeds: [{color: '0xFF0000', description: language("MUSIC_CHANNEL_VOCAL") }]})
        }

        if (!client.player.getQueue(message)) return message.channel.send({embeds: [{color: '0xFF0000', description: language("MUSIC_ERROR_1") }]})
      
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
         return message.channel.send({embeds: [{color: '0xFF0000', description: language("PLAY_ALREADYPLAYMUSIC") }]})
        }

        const queue = client.player.getQueue(message);

        if (!queue) return message.channel.send({embeds: [{color: '0xFF0000', description: language("MUSIC_ERROR_1") }]})

        const pagination = require('discord.js-pagination');

        if (queue.tracks.length >= 10) {
            let res = queue.tracks.map((track, i) => {
                return `**#${i+1}** - ${track.title} | ${track.author} (${language("QUEUE_REQUESTBY")} : ${track.requestedBy.username})`
             }).join('\n').split('\n')

             let Title = `🎞 Queue : \n\n ${language("QUEUE_QUEUE_IN_PROGRESS")} : ${queue.playing.title} | ${queue.playing.author} \n \n `

             const page1 = new Discord.MessageEmbed()
             .setTitle(Title)
             .setDescription(res.slice(0, 10))

             const page2 = new Discord.MessageEmbed()
             .setTitle(Title)
             .setDescription(res.slice(10, 20))

             const page3 = new Discord.MessageEmbed()
             .setTitle(Title)
             .setDescription(res.slice(20, 30))

             const page4 = new Discord.MessageEmbed()
             .setTitle(Title)
             .setDescription(res.slice(30, 40))

             const page5 = new Discord.MessageEmbed()
             .setTitle(Title)
             .setDescription(res.slice(40, 50))

             const page6 = new Discord.MessageEmbed()
             .setTitle(Title)
             .setDescription(res.slice(50, 60))

             const page7 = new Discord.MessageEmbed()
             .setTitle(Title)
             .setDescription(res.slice(60, 70))

             const page8 = new Discord.MessageEmbed()
             .setTitle(Title)
             .setDescription(res.slice(70, 80))

             const page9 = new Discord.MessageEmbed()
             .setTitle(Title)
             .setDescription(res.slice(80, 90))

             const page10 = new Discord.MessageEmbed()
             .setTitle(Title)
             .setDescription(res.slice(90, 100))
         
         
             const pages = [ page1, page2, page3, page4, page5, page6, page7, page8, page9, page10 ]
             const emoji = ["⏪", "⏩"]
             const timeout = '900000'
         
             pagination(message, pages, emoji, timeout)
        } else {
            return message.channel.send({embed: {color: '0x00FF46', description: `🎞 Queue : \n\n ${language("QUEUE_QUEUE_IN_PROGRESS")} : ${queue.playing.title} | ${queue.playing.author} \n \n ` +

            queue.tracks.map((track, i) => {
               return `**#${i+1}** - ${track.title} | ${track.author} (${language("QUEUE_REQUESTBY")} : ${track.requestedBy.username})`
            }).join('\n')
    
           }}).catch(e => {
            return message.channel.send(language("QUEUE_NOQUEUE"));
           });
        }

    }
}

module.exports = new Queue;