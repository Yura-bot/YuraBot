const Command = require("../../structure/Command.js");

class Baka extends Command {
    constructor() {
        super({
            name: 'baka',
            aliases: [''],
            category: 'fun',
            description: "Montre un gif d'une personne disant : 'Baka'.",
            usage: 'baka'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");
        const axios = require("axios")

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        axios.get(`https://nekos.best/api/v1/baka`)
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
            client.emit('error',e, "baka");
        }
      });
    }
}

module.exports = new Baka;