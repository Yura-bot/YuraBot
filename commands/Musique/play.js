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

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if (!args[1]) return message.channel.send({embeds: [{color: '0xFF0000', description: language("PLAY_NO_REQUEST") }]})

        if (!message.member.voice.channel) {
         return message.channel.send({embeds: [{color: '0xFF0000', description: language("MUSIC_CHANNEL_VOCAL") }]})
        }
      
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
         return message.channel.send({embeds: [{color: '0xFF0000', description: language("PLAY_ALREADYPLAYMUSIC") }]})
        }

        const queue = client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            queue.destroy();
            return await message.reply({embeds: [{color: '0xFF0000', description: language("MUSIC_ERROR_3") }]})
        }

        const track = await client.player.search(args.slice(1).join(' '), {
            requestedBy: message.user
        }).then(x => x.tracks[0]);

        if (!track) return await message.reply({embeds: [{color: '0xFF0000', description: language("MUSIC_NO_RESULTS").replace("{query}", args.slice(1).join(' ')) }]})
        queue.play(track);
    }
}

module.exports = new Play;