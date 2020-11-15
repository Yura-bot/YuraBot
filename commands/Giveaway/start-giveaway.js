const Command = require("../../structure/Command.js");

class CreateGiveaway extends Command {
    constructor() {
        super({
            name: 'start-giveaway',
            aliases: ['sta-give', 's-g'],
            category: 'giveaway',
            description: 'Permet de crée et de lancer un giveaway.',
            usage: 'start-giveaway [Channel] [Temps] [Nombre de gagnants] [Prix] '
        });
    }

    async run(client, message, args) {

        const Discord = require("discord.js");
        const ms = require('ms');

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

        let giveawayPrize = args.slice(4).join(' ');

        if(!giveawayPrize){
            return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_GIVEAWAY_START"));
        }

        // Start the giveaway
       client.giveawaysManager.start(giveawayChannel, {
         time: ms(giveawayDuration),
         prize: giveawayPrize,
         winnerCount: giveawayNumberWinners,
         hostedBy: true ? message.author : null,
         messages: {
             giveaway: language("GIVEAWAY_START_TITLE"),
             giveawayEnded: language("GIVEAWAY_START_ENDED"),
             timeRemaining: language("GIVEAWAY_START_TIME_REMAINING"),
             inviteToParticipate: language("GIVEAWAY_START_REACT"),
             winMessage: language("GIVEAWAY_START_WIN_MESSAGE"),
             embedFooter: language("GIVEAWAY_START_FOOTER"),
             noWinner: language("GIVEAWAY_START_NO_WINER"),
             hostedBy: "Par : {user}",
             winners: language("GIVEAWAY_START_WINER"),
             endedAt: language("GIVEAWAY_START_ENDED_AT"),
             units: {
                seconds: language("GIVEAWAY_START_SECONDS"),
                minutes: language("GIVEAWAY_START_MINUTES"),
                hours: language("GIVEAWAY_START_HOURS"),
                days: language("GIVEAWAY_START_DAYS"),
                pluralS: false
            }
        }
       });

       message.channel.send({embed: {color: '0x00FF46', description: `${client.getEmoji(client.config.emojis.yes)} | ${language("GIVEAWAY_GO")}${giveawayChannel} !` }}).catch(e => {
        return client.emit('error',e, "start-giveaway");
    });
    }
}

module.exports = new CreateGiveaway;