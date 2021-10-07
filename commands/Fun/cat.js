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

            const Embed = new Discord.MessageEmbed()
            .setURL(client.url)
            .setImage(array[0].url)
            .setColor(client.color)
            .setTimestamp()
            .setFooter(client.footer,  client.user.displayAvatarURL({format: 'png'}));
            return message.channel.send({ embeds: [Embed] })
            
        } else {
            client.emit('error',e, "cat");
        }
      });
    }
}

module.exports = new Cat;