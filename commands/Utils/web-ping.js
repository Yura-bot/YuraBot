const Command = require("../../structure/Command.js");

class WebPing extends Command {
    constructor() {
        super({
            name: 'web-ping',
            aliases: ['wp'],
            category: 'utils',
            description: 'Permet de ping un site.',
            usage: 'web-ping [site]'
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

        let site = args[1]
        if (!site) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_WEB_PING"));


        axios.get(`http://ip-api.com/json/${site}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,mobile,proxy,hosting,query`)
        .then((response) => {
            if (response.data.status == "fail") {
                message.channel.send(language("WEB_PING_NOSITEFOUND"))
            } else if (response.data.status = "success") {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`${language("WEB_PING_TITLE", site)} (${response.data.query})`)
                    .setColor("#36393f")
                    .addField(language("WEB_PING_OWNER"), `${language("WEB_PING_ORGANISATION")} ${response.data.org} \n${language("WEB_PING_INTERNET")} ${response.data.isp} (${response.data.as})`)
                    .addField(language("WEB_PING_LOCATION"), `${language("WEB_PING_COUNTRY")} ${response.data.country} \n${language("WEB_PING_CITY")} ${response.data.city}`)
                    .addField(language("WEB_PING_OTHER"), `${language("WEB_PING_MOBILE")} ${response.data.mobile} \n${language("WEB_PING_PROXY")} ${response.data.proxy}\n${language("WEB_PING_HOSTING")} ${response.data.hosting}`)
                message.channel.send(embed);
            }
        })
        .catch(e => {
            return message.channel.send(language("WEB_PING_NOSITEFOUND"))
        });
    }
}

module.exports = new WebPing;