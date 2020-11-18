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

        const disabledEmoji = client.getEmoji(client.config.emojis.no);
        const enabledEmoji = client.getEmoji(client.config.emojis.yes);
    
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
                description:language("FILTER_LIST", prefix),
            },
        });

        return;
    }
}

module.exports = new FilterList;