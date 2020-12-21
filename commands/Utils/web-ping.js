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

        axios.get(`https://isitup.org/${site}.json`)
        .then((response) => {
            message.channel.send({embed: {color: '0x00FF46', description: `${language("WEB_PING_SUCESS")} **${response.data.domain}** ! **${response.data.response_time}**sec !` }})
        })
        .catch(e => {
            return message.channel.send(language("WEB_PING_NOSITEFOUND"))
        });
    }
}

module.exports = new WebPing;