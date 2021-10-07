const Command = require("../../structure/Command.js");
const filters = require("../../configs/filters.json");

class FilterList extends Command {
    constructor() {
        super({
            name: 'filter-list',
            aliases: [''],
            category: 'music',
            description: 'Voir les filtres ajoutables.',
            usage: 'filter-list'
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

        const disabledEmoji = client.config.emojis.no;
        const enabledEmoji = client.config.emojis.yes;

        let disabledFilters = queue.getFiltersDisabled();
        let enabledFilters = queue.getFiltersEnabled();

        let AllFilters1 = []
        let AllFilters2 = []

        disabledFilters.forEach(el => {
            if (el === "bassboost_low" || el === "bassboost_high") return
            if (AllFilters1.length > 15) return AllFilters2.push(`${el} : ${disabledEmoji}`)
            AllFilters1.push(`${el} : ${disabledEmoji}`)
        })

        enabledFilters.forEach(el => {
            if (el === "bassboost_low" || el === "bassboost_high") return
            if (AllFilters1.length > 15) return AllFilters2.push(`${el} : ${enabledEmoji}`)
            AllFilters1.push(`${el} : ${enabledEmoji}`)
        })

        message.channel.send({
            embeds: [{
                color: 'ORANGE',
                footer: { text: client.footer },
                fields: [
                    { name: 'Filters :', value: AllFilters1.join('\n'), inline: true },
                    { name: '** **', value: AllFilters2.join('\n'), inline: true },
                ],
                timestamp: new Date(),
                description:language("FILTER_LIST").replace("{prefix}", prefix),
            }],
        });

        return;
    }
}

module.exports = new FilterList;