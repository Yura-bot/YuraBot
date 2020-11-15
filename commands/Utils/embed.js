const Command = require("../../structure/Command.js");

class Embed extends Command {
    constructor() {
        super({
            name: 'embed',
            aliases: ['create-embed'],
            category: 'utils',
            description: 'Permets de créer un embed personnaliser.',
            usage: 'embed | [couleur] | [Titre] | [Déscription] | [Footer]'
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

        var params_array = args.join(' ').split(' | ');
        var color = params_array[1];
        var title = params_array[2];
        var msg = params_array[3];
        var footer = params_array[4];

        if(!color || !title || !msg || !footer) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_EMBED"));
    
        const embed = new Discord.MessageEmbed()
            .setAuthor(title)
            .setDescription(msg)
            .setColor(color)
            .setFooter(footer)
        
        message.channel.send(embed)
    }
}

module.exports = new Embed;