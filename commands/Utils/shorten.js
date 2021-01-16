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

    async run(client, message, args, db) {

        const Discord = require("discord.js");
        const isgd = require('isgd');

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        let contenu = args[1]
        if (!contenu) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_SHORTEN"));

        isgd.shorten(contenu, function(res) {
           message.channel.send(language("SHORTEN_SUCESS")+res);
        });


    }
}

module.exports = new Shorten;