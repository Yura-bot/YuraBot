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
        if (!filter) return message.channel.send({embeds: [{color: '0xFF0000', description: language("FILTER_NO") }]})

        let disabledFilters = queue.getFiltersDisabled();
        let enabledFilters = queue.getFiltersEnabled();

        let filters = {}

        enabledFilters.forEach(el => {
            Object.assign(filters, { [el]: true })
        })

        let isDisabled = disabledFilters.find(el => el === filter) ? true : false

        Object.assign(filters, { [filter]: isDisabled });

        queue.setFilters(filters)
    
        if (isDisabled) message.channel.send({embeds: [{color: '0x00FF46', description: language("FILTER_ADDED") }]})
        else message.channel.send({embeds: [{color: '0x00FF46', description: language("FILTER_REMOVE") }]})

        return;
    }
}

module.exports = new Filter;