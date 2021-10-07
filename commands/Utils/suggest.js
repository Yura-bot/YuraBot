const Command = require("../../structure/Command.js");

class Suggest extends Command {
    constructor() {
        super({
            name: 'suggest',
            aliases: ['suggestion'],
            category: 'utils',
            description: 'Pour proposer une suggestion si votre serveur a activé le système.',
            usage: 'suggestion [Description]'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        let statusSuggest = db.suggestions

        if (statusSuggest) {
            let contenu = args.slice(1).join(" ")

            let suggestionChannel = db.suggestions
            if (client.channels.cache.has(suggestionChannel) === false ) return message.channel.send({embeds: [{color: '0xFF0000', description: language("SUGGEST_ERROR_NO_CHANNEL") }]})

            if(!args[1]) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_SUGGEST"));

            const suggest = new Discord.MessageEmbed()
            .setDescription(language("SUGGEST_TITLE"))
            .addField(language("SUGGEST_AUTHOR"), "" + message.author.tag + "")
            .addField(language("SUGGEST_DESC"), contenu, true)
            .setColor("#FFD97C")

            client.channels.cache.get(suggestionChannel).send({embeds: [suggest]})
            .then(m => {
                m.react('✅')
                m.react('➖')
                m.react ('❌')
            })
            .catch(e => {
                return message.channel.send(language("SUGGEST_ERROR"));
            });

            message.author.send(language("SUGGEST_SUCESS")).catch(e => {});

        } else {
            return message.channel.send({embeds: [{color: '0xFF0000', description: language("SUGGEST_ERROR_NO_SYSTEM") }]})
        }
    }
}

module.exports = new Suggest;