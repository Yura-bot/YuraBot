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

    async run(client, message, args) {

        const Discord = require("discord.js");
        const figlet = require("figlet");

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

        try {
            if(args.slice(1).join(' ').length > 20) return message.channel.send({embed: {color: '0xFF0000', description: `${client.getEmoji(client.config.emojis.no)} | ${language("ASCII_LIMIT_MESSAGE")}` }})
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