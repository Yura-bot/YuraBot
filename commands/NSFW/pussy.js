const Command = require("../../structure/Command.js");

class Pussy extends Command {
    constructor() {
        super({
            name: 'pussy',
            aliases: [''],
            category: 'NSFW',
            description: 'Affiche une image NSFW type pussy.',
            usage: 'pussy'
        });
    }

    async run(client, message, args) {

        const Discord = require("discord.js");

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

        const superagent = require('superagent');

        if (!message.channel.nsfw) return message.channel.send(language("NSFW_NO_CHANNEL_NSFW")).catch(e => {
            return client.emit('error',e);
        });

        const lo = new Discord.MessageEmbed()
                    .setDescription(language("NSFW_LOADING"))
                    .setTimestamp()

        message.channel.send(lo).then(m => {

            superagent.get('https://nekobot.xyz/api/image').query({ type: 'pussy'}).end((err, response) => {

                const embed_nsfw = new Discord.MessageEmbed()
                    .setDescription(`${language("NSFW_IMG_NO_CHARGING")}(${response.body.message})**`)
                    .setTimestamp()
                    .setImage(response.body.message)
            
                m.edit(embed_nsfw).catch(e => {
                    return client.emit('error',e);
                });
            });
        }).catch(e => {
            return client.emit('error',e);
        });
    }
}

module.exports = new Pussy;