const Command = require("../../structure/Command.js");
const filters = require("../../configs/filters.json");

class Filter extends Command {
    constructor() {
        super({
            name: 'filter',
            aliases: [''],
            category: 'music',
            description: 'Permet de mettre ou désactiver un filtre sur la musique.',
            usage: 'filter [filtre]'
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

        const filter = args[1];
        if (!filter) return message.channel.send({embed: {color: '0xFF0000', description: language("FILTER_NO") }})

        const filterToUpdate = Object.values(filters).find((f) => f.toLowerCase() === filter.toLowerCase());
        if (!filterToUpdate) return message.channel.send({embed: {color: '0xFF0000', description: language("FILTER_NOT_EXIST") }})
    
        const filterRealName = Object.keys(filters).find((f) => filters[f] === filterToUpdate);
    
        const queueFilters = client.player.getQueue(message).filters
        const filtersUpdated = {};
        filtersUpdated[filterRealName] = queueFilters[filterRealName] ? false : true;

        client.player.setFilters(message, filtersUpdated).catch(e => {
            return client.emit('error',e, "Filtre");
        });
    
        if (filtersUpdated[filterRealName]) message.channel.send({embed: {color: '0x00FF46', description: language("FILTER_ADDED") }})
        else message.channel.send({embed: {color: '0x00FF46', description: language("FILTER_REMOVE") }})

        return;
    }
}

module.exports = new Filter;