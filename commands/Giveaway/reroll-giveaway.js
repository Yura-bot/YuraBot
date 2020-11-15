const Command = require("../../structure/Command.js");

class RerollGiveaway extends Command {
    constructor() {
        super({
            name: 'reroll-giveaway',
            aliases: ['rero-give', 'r-g'],
            category: 'giveaway',
            description: 'Permet de reroll un giveaway.',
            usage: 'reroll-giveaway [Message ID du Giveaway en cour] '
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

        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.channel.send(language("MISSING_PERMISSION_MANAGE_MESSAGES"));
        }

        if(!args[1]){
            return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_GIVEAWAY_REROLL"));
        }

        let giveaway = 

        client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||

        client.giveawaysManager.giveaways.find((g) => g.messageID === args[1]);

        if(!giveaway){
            return message.channel.send(language("GIVEAWAY_REROLL_NO_FOUND")+'`'+args.slice(1).join(' ')+'`');
        }

        client.giveawaysManager.reroll(giveaway.messageID)
        .then(() => {
            return message.channel.send({embed: {color: '0x00FF46', description: `${client.getEmoji(client.config.emojis.yes)} | ${language("GIVEAWAY_REROLL_SUCESS")}` }})
        })
        .catch((e) => {
            if(e.startsWith(`${language("GIVEAWAY_REROLL_NO_END_1")}${giveaway.messageID}${language("GIVEAWAY_REROLL_NO_END_2")}`)){
                message.channel.send(language("GIVEAWAY_REROLL_NO_END"));
            } else {
                client.emit('error',e, "reroll-giveaway");
                return message.channel.send(language("GIVEAWAY_REROLL_ERROR_OCCURED"));
            }
        });
    }
}

module.exports = new RerollGiveaway;