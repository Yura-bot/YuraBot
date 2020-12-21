const Command = require("../../structure/Command.js");

class Loop extends Command {
    constructor() {
        super({
            name: 'loop',
            aliases: [''],
            category: 'music',
            description: 'Permet de mettre ou désactiver la boucle .',
            usage: 'loop'
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

        const repeatMode = client.player.getQueue(message).repeatMode;

        if (repeatMode) {
            client.player.setRepeatMode(message, false);
            return message.channel.send({embed: {color: '0x00FF46', description: language("LOOP_ACTIVATE") }})
        } else {
            client.player.setRepeatMode(message, true);
            return message.channel.send({embed: {color: '0x00FF46', description: language("LOOP_DESACTIVATE") }})
        };
    }
}

module.exports = new Loop;