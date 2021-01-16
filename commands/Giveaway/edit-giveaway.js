const Command = require("../../structure/Command.js");

class EditGiveaway extends Command {
    constructor() {
        super({
            name: 'edit-giveaway',
            aliases: ['edit-give', 'ed-g'],
            category: 'giveaway',
            description: "Permet d'éditer un giveaway.",
            usage: 'edit-giveaway [ID] [Nombre de gagnants] [Nouveau Prix]'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");
        const ms = require('ms');

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.channel.send(language("MISSING_PERMISSION_MANAGE_MESSAGES"));
        }

        if(!args[1]) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_GIVEAWAY_EDIT"));

        let giveaway = 

        client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||

        client.giveawaysManager.giveaways.find((g) => g.messageID === args[1]);

        if(!giveaway){
            return message.channel.send({embed: {color: '0xFF0000', description: `${client.getEmoji(client.config.emojis.no)} | ${language("GIVEAWAY_EDIT_NO_FOUND")}`+'`'+args.slice(1).join(' ')+'`' }})
        }    

        let giveawayNumberWinners = args[2];
        if(isNaN(giveawayNumberWinners)) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_GIVEAWAY_EDIT"));
        
        let giveawayPrize = args.slice(3).join(' ');
        if(!giveawayPrize) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_GIVEAWAY_EDIT"));

        let messageID = args[1];
        client.giveawaysManager.edit(messageID, {
            newWinnerCount: giveawayNumberWinners,
            newPrize: giveawayPrize,
            addTime: 5000
        }).then(() => {
            message.channel.send({embed: {color: '0x00FF46', description: `${client.getEmoji(client.config.emojis.yes)} | ${language("GIVEAWAY_EDIT_SUCESS")}` }})
        }).catch((err) => {
            client.emit('error',e, "edit-giveaway");
            message.channel.send(language("GIVEAWAY_EDIT_ERROR_OCCURED"));
        });
    }
}

module.exports = new EditGiveaway;