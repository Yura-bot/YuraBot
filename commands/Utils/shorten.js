const Command = require("../../structure/Command.js");

class Shorten extends Command {
    constructor() {
        super({
            name: 'shorten',
            aliases: ['sh'],
            category: 'utils',
            description: 'Permet de raccourcir un lien.',
            usage: 'shorten [lien]'
        });
    }

    async run(client, message, args) {

        const Discord = require("discord.js");
        const isgd = require('isgd');

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

        let contenu = args[1]
        if (!contenu) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_SHORTEN"));

        isgd.shorten(contenu, function(res) {
           message.channel.send(language("SHORTEN_SUCESS")+res);
        });


    }
}

module.exports = new Shorten;