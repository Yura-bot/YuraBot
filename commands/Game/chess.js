const Command = require("../../structure/Command.js");

class Chess extends Command {
    constructor() {
        super({
            name: 'chess',
            aliases: [''],
            category: 'game',
            description: "Permet de jouer au échecs dans un salon vocal.",
            usage: 'chess'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if (!message.member.voice.channel) {
            return message.channel.send({embeds: [{color: '0xFF0000', description: language("NOT_CONNECTED") }]})
           }

        client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'chess').then(async invite => {
            message.channel.send({embeds: [{color: '0x00FF46', description: language("LAUNCHED") }]})
            return message.channel.send(`${invite.code}`);
        });

    }
}

module.exports = new Chess;