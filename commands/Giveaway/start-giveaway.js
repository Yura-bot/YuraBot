const Command = require("../../structure/Command.js");

class CreateGiveaway extends Command {
    constructor() {
        super({
            name: 'start-giveaway',
            aliases: ['sta-give', 's-g'],
            category: 'giveaway',
            description: 'Permet de crée et de lancer un giveaway.',
            usage: 'start-giveaway [Channel] [Temps] [Nombre de gagnants] [Prix] (condition [Role])'
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

        let giveawayChannel = message.mentions.channels.first();

        if(!giveawayChannel){
            return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_GIVEAWAY_START"));
        }

        let giveawayDuration = args[2];

        if(!giveawayDuration || isNaN(ms(giveawayDuration))){
            return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_GIVEAWAY_START"));
        }

         let giveawayNumberWinners = args[3];

        if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
            return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_GIVEAWAY_START"));
        }

        let roleCondition = message.mentions.roles.first()
        let numPlace = 5
        if (!roleCondition) roleCondition = { id: null }; numPlace = 4;

        let giveawayPrize = args.slice(numPlace).join(' ');

        if(!giveawayPrize){
            return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_GIVEAWAY_START"));
        }

        // Start the giveaway
        client.giveawaysManager.start(giveawayChannel, {
            duration: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: parseInt(giveawayNumberWinners),
            messages: {
                giveaway: language("GIVEAWAY_START_TITLE"),
                giveawayEnded: language("GIVEAWAY_START_ENDED"),
                drawing: language("GIVEAWAY_START_TIME_REMAINING"),
                inviteToParticipate: language("GIVEAWAY_START_REACT"),
                winMessage: language("GIVEAWAY_START_WIN_MESSAGE"),
                embedFooter: language("GIVEAWAY_START_FOOTER"),
                noWinner: language("GIVEAWAY_START_NO_WINER"),
                hostedBy: language("GIVEAWAY_START_BY"),
                conditionRole: language("GIVEAWAY_START_CONDITION_ROLE"),
                winners: language("GIVEAWAY_START_WINER"),
                endedAt: language("GIVEAWAY_START_ENDED_AT")
           },
           extraData: { roles: [ roleCondition.id ], guilds: [] },
        });

       message.channel.send({embeds: [{color: '0x00FF46', description: `${client.config.emojis.yes} | ${language("GIVEAWAY_GO")}${giveawayChannel} !` }]}).catch(e => {
        return client.emit('error',e, "start-giveaway");
       });
    }
}

module.exports = new CreateGiveaway;