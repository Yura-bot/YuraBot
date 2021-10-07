const Command = require("../../structure/Command.js");

class Embed extends Command {
    constructor() {
        super({
            name: 'embed',
            aliases: ['create-embed'],
            category: 'utils',
            description: 'Permets de créer un embed personnaliser.',
            usage: 'embed [couleur] | [Titre] | [Déscription] | [Footer]'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        var params_array = args.splice(1).join(" ").split("|");
        var color = params_array[0];
        var title = params_array[1];
        var msg = params_array[2];
        var footer = params_array[3];

        if(!color || !title || !msg || !footer) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_EMBED"));
    
        const embed = new Discord.MessageEmbed()
            .setAuthor(title)
            .setDescription(msg)
            .setColor(color)
            .setFooter(footer)
        
        message.channel.send({ embeds: [embed] })
    }
}

module.exports = new Embed;