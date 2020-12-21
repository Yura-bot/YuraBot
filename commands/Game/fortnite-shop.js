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

        const exampleEmbed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTitle('<:calendar2:675368550571048971> Fortnite shop :')
        .setURL(client.url)
        .setImage('https://ctk-api.herokuapp.com/fortnite-shop')
        .setTimestamp()
        .setFooter(client.footer, client.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }));
    
        message.channel.send(exampleEmbed);

    }
}

module.exports = new FortniteShop;