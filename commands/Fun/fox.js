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

            const Embed = new Discord.MessageEmbed()
            .setURL(client.url)
            .setImage(response.data.image)
            .setColor(client.color)
            .setTimestamp()
            .setFooter(client.footer,  client.user.displayAvatarURL({format: 'png'}));
            return message.channel.send({ embeds: [Embed] })

        } else {
            client.emit('error',e, "fox");
        }
      });
    }
}

module.exports = new Fox;