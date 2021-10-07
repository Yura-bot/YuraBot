const Command = require("../../structure/Command.js");

class FortniteShop extends Command {
    constructor() {
        super({
            name: 'fortnite-shop',
            aliases: ['f-s'],
            category: 'game',
            description: "Permet de voir le shop de fortnite en temps réel.",
            usage: 'fortnite-shop'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTitle('<:calendar2:675368550571048971> Fortnite shop :')
        .setURL(client.url)
        .setImage('https://ctk-api.herokuapp.com/fortnite-shop')
        .setTimestamp()
        .setFooter(client.footer, client.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }));
    
        message.channel.send({ embeds: [embed] })

    }
}

module.exports = new FortniteShop;