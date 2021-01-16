const Command = require("../../structure/Command.js");

class Dog extends Command {
    constructor() {
        super({
            name: 'dog',
            aliases: ['chien'],
            category: 'fun',
            description: "Montre une image d'un chien aléatoirement.",
            usage: 'dog'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");
        const axios = require("axios")

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        axios.get(`https://random.dog/woof.json`)
        .then((response) => {
          if (response.status === 200) {

            message.channel.send({
                embed: {
                    title: "Dog :",
                    image: {
                        url: response.data.url,
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
                return client.emit('error',e, "dog");
            });
        } else {
            client.emit('error',e, "dog");
        }
      });
    }
}

module.exports = new Dog;