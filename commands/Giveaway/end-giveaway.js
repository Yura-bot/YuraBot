const Command = require("../../structure/Command.js");

class EndGiveaway extends Command {
    constructor() {
        super({
            name: 'end-giveaway',
            aliases: ['end-give', 'e-g'],
            category: 'giveaway',
            description: 'Permet de terminer un giveaway.',
            usage: 'end-giveaway [Message ID du Giveaway en cour] '
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");
        const ms = require('ms');

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if(!message.member.permissions.has('MANAGE_MESSAGES')){
            return message.channel.send(language("MISSING_PERMISSION_MANAGE_MESSAGES"));
        }

        if(!args[1]){
            return message.channel.send({embeds: [{color: '0xFF0000', description: `${client.config.emojis.no} | ${language("GIVEAWAY_END_ID_INVALIDE")} !` }]})
        }

        let giveaway = client.giveawaysManager.giveaways.find((g) => g.messageId === args[1]);

        if(!giveaway){
            return message.channel.send({embed: {color: '0xFF0000', description: `${client.config.emojis.no} | ${language("GIVEAWAY_END_ERROR")}`+'`'+args.slice(1).join(' ')+'`' }})
        }

        if (giveaway.ended) return message.channel.send(language("GIVEAWAY_END_ALREADY_END"));

        client.giveawaysManager.end(giveaway.messageId)
        .then(() => {
            message.channel.send({embeds: [{color: '0x00FF46', description: `${client.config.emojis.yes} | ${language("GIVEAWAY_END_SUCESS")}${client.giveawaysManager.options.updateCountdownEvery/1000} seconds...` }]})
            //message.channel.send(language("GIVEAWAY_END_SUCESS")+(client.giveawaysManager.options.updateCountdownEvery/1000)+' seconds...');
        })
        .catch((e) => {
            if(e.startsWith(`${language("GIVEAWAY_END_ID_NO_TERMINER_1")}${args[1]}${language("GIVEAWAY_END_ID_NO_TERMINER_2")}`)){
                message.channel.send(language("GIVEAWAY_END_NO_TERMINER"));
            } else {
                client.emit('error',e, "end-giveaway");
                message.channel.send(language("GIVEAWAY_END_ERROR_OCCURED"));
            }
        });
    }
}

module.exports = new EndGiveaway;