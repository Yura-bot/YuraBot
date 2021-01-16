const Command = require("../../structure/Command.js");

class Cat extends Command {
    constructor() {
        super({
            name: 'cat',
            aliases: ['chat'],
            category: 'fun',
            description: "Montre une image d'un chat aléatoirement.",
            usage: 'cat'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");
        const axios = require("axios")

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

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