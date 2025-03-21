const Command = require("../../structure/Command.js");

class Invite extends Command {
    constructor() {
        super({
            name: 'invite',
            aliases: [''],
            category: 'bot',
            description: 'Vous donne des liens pour inviter le bot.',
            usage: 'invite'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if (message.content != prefix+"invite") return;

        const invite = new Discord.MessageEmbed()
        .setDescription(`${language("INVITE_TITLE")}`)
        .addField(language("INVITE_ADMIN"), `[${language("INVITE_CLICK_HERE")}](https://discordapp.com/oauth2/authorize?client_id=662775890194989066&scope=bot&permissions=2016570495)`)
        .addField(language("INVITE_PERSO"), `[${language("INVITE_CLICK_HERE")}](https://discordapp.com/oauth2/authorize?client_id=%20662775890194989066&scope=bot&permissions=1342319703)`)
        .setColor(client.color)
        return message.channel.send({ embeds: [invite] })
    }
}

module.exports = new Invite;