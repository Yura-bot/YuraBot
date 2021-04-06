const Command = require("../../structure/Command.js");

class Joke extends Command {
    constructor() {
        super({
            name: 'joke',
            aliases: ['blague'],
            category: 'fun',
            description: 'Affiche une blague !',
            usage: 'blague'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");
        const axios = require("axios")

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        let jokeLang = !guildLanguage === "french" ? "en" : "fr";

        const joke = await axios.get(`https://www.blagues-api.fr/api/random`, {
            headers: {
                'Authorization': `Bearer ${client.config.jokeToken}`,
            }
        }).catch(e => {
            return client.emit('error',e, "joke");
        });
        
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setTitle(language("TITLE_JOKE"))
			.setDescription(`${joke.data.joke} \n ||${joke.data.answer}||`)
			.setFooter(client.footer);

		message.channel.send(embed).catch(e => {
            return client.emit('error',e, "joke");
        });
    }
}

module.exports = new Joke;