const Command = require("../../structure/Command.js");

class Fox extends Command {
    constructor() {
        super({
            name: 'fox',
            aliases: ['renard'],
            category: 'fun',
            description: "Montre une image d'un renard aléatoirement.",
            usage: 'fox'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");
        const axios = require("axios")

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

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