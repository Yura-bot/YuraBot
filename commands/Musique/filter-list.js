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
    
        const filtersStatuses = [[], []];
    
        Object.keys(filters).forEach((filterName) => {
            const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
            array.push(filters[filterName] + " : " + (client.player.getQueue(message).filters[filterName] ? enabledEmoji : disabledEmoji));
        });
    
        message.channel.send({
            embed: {
                color: 'ORANGE',
                footer: { text: client.footer },
                fields: [
                    { name: 'Filters :', value: filtersStatuses[0].join('\n'), inline: true },
                    { name: '** **', value: filtersStatuses[1].join('\n'), inline: true },
                ],
                timestamp: new Date(),
                description:language("FILTER_LIST").replace("{prefix}", prefix),
            },
        });

        return;
    }
}

module.exports = new FilterList;