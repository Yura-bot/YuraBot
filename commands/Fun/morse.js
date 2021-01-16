const Command = require("../../structure/Command.js");

class Morse extends Command {
    constructor() {
        super({
            name: 'morse',
            aliases: [],
            category: 'fun',
            description: 'Traduit votre texte en morse',
            usage: 'morse [Texte]'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");
        const morse = require('morse');

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        let txt = args.slice(1).join(" ");
        if (!args[1]) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_MORSE"));

        let encoded = morse.encode(txt);
        return message.channel.send(language("MORSE_SUCESS")+"```"+encoded+"```");
    }
}

module.exports = new Morse;