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

    async run(client, message, args) {

        const Discord = require("discord.js");
        const axios = require('axios');

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

        let city = args[1]
        if (!city) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_WEB_PING"));

        const exampleEmbed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTitle(language("WEATHER_SUCESS", city))
        .setURL(client.url)
        .setImage(`https://wttr.in/${city}.png`)
        .setTimestamp()
        .setFooter(client.footer, client.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }));
    
        message.channel.send(exampleEmbed).catch(e => {});
    }
}

module.exports = new Weather;