const Command = require("../../structure/Command.js");

class Hkitsune extends Command {
    constructor() {
        super({
            name: 'hkitsune',
            aliases: [''],
            category: 'NSFW',
            description: 'Affiche une image NSFW type hkitsune.',
            usage: 'hkitsune'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        const superagent = require('superagent');

        if (!message.channel.nsfw) return message.channel.send(language("NSFW_NO_CHANNEL_NSFW")).catch(e => {
            return client.emit('error',e);
        });

        const lo = new Discord.MessageEmbed()
                    .setDescription(language("NSFW_LOADING"))
                    .setTimestamp()

        message.channel.send({ embeds: [lo] }).then(m => {

            superagent.get('https://nekobot.xyz/api/image').query({ type: 'hkitsune'}).end((err, response) => {

                const embed_nsfw = new Discord.MessageEmbed()
                    .setDescription(`${language("NSFW_IMG_NO_CHARGING")}(${response.body.message})**`)
                    .setTimestamp()
                    .setImage(response.body.message)
            
                m.edit({ embeds: [embed_nsfw] }).catch(e => {
                    return client.emit('error',e);
                });
            });
        }).catch(e => {
            return client.emit('error',e);
        });
    }
}

module.exports = new Hkitsune;