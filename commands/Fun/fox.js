const Command = require("../../structure/Command.js");

class Fox extends Command {
    constructor() {
        super({
            name: 'fox',
            aliases: ['renard'],
            category: 'utils',
            description: "Montre une image d'un renard aléatoirement.",
            usage: 'fox'
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

        axios.get(`https://randomfox.ca/floof/`)
        .then((response) => {
          if (response.status === 200) {

            message.channel.send({
                embed: {
                    title: "Fox :",
                    image: {
                        url: response.data.image,
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
                return client.emit('error',e, "fox");
            });
        } else {
            client.emit('error',e, "fox");
        }
      });
    }
}

module.exports = new Fox;