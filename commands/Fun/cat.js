const Command = require("../../structure/Command.js");

class Cat extends Command {
    constructor() {
        super({
            name: 'cat',
            aliases: ['chat'],
            category: 'utils',
            description: "Montre une image d'un chat aléatoirement.",
            usage: 'cat'
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

        axios.get(`https://api.thecatapi.com/v1/images/search`)
        .then((response) => {
          if (response.status === 200) {

            let array = response.data

            message.channel.send({
                embed: {
                    title: "Cat :",
                    image: {
                        url: array[0].url,
                    },
                    url: client.url,
                    color: client.color,
                    timestamp: new Date(),
                    footer: {
                        text: client.footer,
                        icon_url: client.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
                    }
                }
            }).catch(e => {
                return client.emit('error',e, "cat");
            });
        } else {
            client.emit('error',e, "cat");
        }
      });
    }
}

module.exports = new Cat;