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

            const Embed = new Discord.MessageEmbed()
            .setURL(client.url)
            .setImage(response.data.url)
            .setColor(client.color)
            .setTimestamp()
            .setFooter(client.footer,  client.user.displayAvatarURL({format: 'png'}));
            return message.channel.send({ embeds: [Embed] })

        } else {
            client.emit('error',e, "dog");
        }
      });
    }
}

module.exports = new Dog;