const Command = require("../../structure/Command.js");

class Ascii extends Command {
    constructor() {
        super({
            name: 'ascii',
            aliases: [''],
            category: 'utils',
            description: 'Permet de convertir un texte en ascii.',
            usage: 'ascii [Texte]'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");
        const figlet = require("figlet");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        try {
            if(args.slice(1).join(' ').length > 20) return message.channel.send({embed: {color: '0xFF0000', description: `${client.config.emojis.no} | ${language("ASCII_LIMIT_MESSAGE")}` }})
            if (!args.slice(1).join(' ')) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_ASCII"));
            figlet(args.slice(1).join(' '), (err, data) => {
                return message.channel.send('\`\`\`' + data + '\`\`\`');
            });
        } catch (e) {
            client.emit('error',e);
            return message.channel.send(`${language("ASCII_ERROR")}\`${e.message}\``);
        }
    }
}

module.exports = new Ascii;