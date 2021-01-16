const Command = require("../../structure/Command.js");

class Avatar extends Command {
    constructor() {
        super({
            name: 'avatar',
            aliases: ['av', 'pp'],
            category: 'images',
            description: '',
            usage: 'avatar (Membre)'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });

        if (message.mentions.users.size > 0) {
          const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setTitle(`${language("MESSAGE_AVATAR")}${message.mentions.users.first().username} :`)
            .setImage(`${avatar}`)
            .setFooter(client.footer);
            message.channel.send({embed});
        } else {
          const embed = new Discord.MessageEmbed()
          .setColor(client.color)
          .setTitle(`${language("MESSAGE_AVATAR")}${message.author.username} :`)
          .setImage(`${avatar + "?size=2048"}`)
          .setFooter(client.footer);
          message.channel.send({embed});
        }
    }
}

module.exports = new Avatar;