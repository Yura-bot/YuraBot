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

    async run(client, message, args) {

        const Discord = require("discord.js");

        let guildSettingsExist = client.guildSettings.has(`${message.guild.id}`)
        let statusSuggest = client.guildSettings.has(`${message.guild.id}`, "suggestionPlug")

        let prefix;
        let guildLanguage;

        if (guildSettingsExist && statusSuggest) {
            prefix = client.guildSettings.get(`${message.guild.id}`, "prefix")
            guildLanguage = client.guildSettings.get(`${message.guild.id}`, "lang")
            const language = require(`../../languages/${guildLanguage}`);

            let contenu = args.slice(1).join(" ")

            let suggestionChannel = client.guildSettings.get(`${message.guild.id}`, "suggestionPlug.channel")
            if (client.channels.cache.has(suggestionChannel) === false ) return message.channel.send({embed: {color: '0xFF0000', description: language("SUGGEST_ERROR_NO_CHANNEL") }})

            if(!args[1]) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_SUGGEST"));

            const suggest = new Discord.MessageEmbed()
            .setDescription(language("SUGGEST_TITLE"))
            .addField(language("SUGGEST_AUTHOR"), "" + message.author.tag + "")
            .addField(language("SUGGEST_DESC"), contenu, true)
            .setColor("#FFD97C")

            client.channels.cache.get(suggestionChannel).send(suggest)
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
            prefix = client.default_prefix;
            guildLanguage = "english"
            const language = require(`../../languages/${guildLanguage}`);
            return message.channel.send({embed: {color: '0xFF0000', description: language("SUGGEST_ERROR_NO_SYSTEM") }})
        }
    }
}

module.exports = new Suggest;