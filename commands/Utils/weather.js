const Command = require("../../structure/Command.js");

class Weather extends Command {
    constructor() {
        super({
            name: 'weather',
            aliases: ['météo'],
            category: 'utils',
            description: 'Permet de voir la météo d\'une ville/région.',
            usage: 'weather [City]'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        let city = args.slice(1).join(" ")
        if (!city) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_WEATHER"));

        let txtFormated = city.split(" ").join("%20");
        let lang = !db.lang ? "en": "fr";
        let link = `https://wttr.in/${txtFormated}_lang=${lang}.png`

        const exampleEmbed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTitle(language("WEATHER_SUCESS").replace("{city}", city))
        .setURL(client.url)
        .setImage(link)
        .setTimestamp()
        .setFooter(client.footer, client.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }));
    
        message.channel.send(exampleEmbed).catch(e => {});
    }
}

module.exports = new Weather;