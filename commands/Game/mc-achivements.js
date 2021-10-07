const Command = require("../../structure/Command.js");

class McAchivements extends Command {
    constructor() {
        super({
            name: 'mc-achivements',
            aliases: ['m-a'],
            category: 'game',
            description: "Permet de crée un achivements minecraft.",
            usage: 'mc-achivements | [block] | [title] | [description1] | (description2)'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if (!args[1]) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_MC_ACHIVEMENT"));

        var params_array = args.join(' ').split(' | ');
        var block = params_array[1];
        var title = params_array[2];
        var string = params_array[3];
        var string2 = params_array[4];
        
        if(!block || !title || !string || !string2) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_MC_ACHIVEMENT"));

        block.replace(' ', "..");
        title.replace(' ', "..");
        string.replace(' ', "..");
        string2.replace(' ', "..");

        let url = `https://minecraft-api.com/api/achivements/${block}/${title}/${string}/${string2}`;

        const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTitle('🖼 Achivement :')
        .setURL(client.url)
        .setImage(url)
        .setTimestamp()
        .setFooter(client.footer, client.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }));
    
        return message.channel.send({ embeds: [embed] }).catch(e => {
            message.channel.send(language("MC_ACHIVEMENT_ERROR"))
            return client.emit('error',e, "mc-achivement");
        });

    }
}

module.exports = new McAchivements;