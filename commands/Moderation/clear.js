const Command = require("../../structure/Command.js");

class Clear extends Command {
    constructor() {
        super({
            name: 'clear',
            aliases: [],
            category: 'mod',
            description: 'Supprime le nombre de message que vous avez mis.',
            usage: 'clear [Chiffre]'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        const error_permissions = new Discord.MessageEmbed()
        .setDescription(language("MISSING_PERMISSION_MANAGE_MESSAGES"))
        .setColor("#F43436")

        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            return message.channel.send({ embeds: [message.channel.send(error_permissions)] })
        }

        if (message.member.permissions.has("MANAGE_MESSAGES")) {
        
            if (!args[1]) {
                message.channel.send(language("CLEAR_LIMIT"))
            } else if (args[1] <= 0) {
              return message.channel.send(language("CLEAR_LIMIT"))
             } else {
                let x = parseInt(args[1], 10)
                if (x > 100) {
                    x = 100
                }
        
                message.delete().catch(e => {});
        
                message.channel.bulkDelete(x)
                .catch(e => {})
                .then(messages => {
                    if (messages === undefined) return message.channel.send(language("CLEAR_14DAYS")).then(msg => msg.delete({timeout: 5000}))
                    message.channel.send(`<:check:673212026226737153> ** ${messages.size} ${language("DELETE_MESSAGE")}`).then(msg => msg.delete({timeout: 5000}))
                });
            }
        }
    }
}

module.exports = new Clear;