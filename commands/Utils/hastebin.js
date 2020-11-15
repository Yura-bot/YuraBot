const Command = require("../../structure/Command.js");

class Hastebin extends Command {
    constructor() {
        super({
            name: 'hastebin',
            aliases: ['haste'],
            category: 'utils',
            description: 'Permet de crée un hastebin avec le bot.',
            usage: 'hastebin [Votre texte/code]'
        });
    }

    async run(client, message, args) {

        const Discord = require("discord.js");
        const hastebin = require("hastebin-gen");

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

        let haste = args.slice(1).join(" ")
        if (!args[1]) { return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_HASTEBIN")); }

        hastebin(haste).then(hasted => {
            message.channel.send(language("HASTEBIN_SUCESS") + hasted);
        }).catch(error => {
            client.emit('error',error);
            return message.channel.send(language("HASTEBIN_ERROR"));
        });

    }
}

module.exports = new Hastebin;