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

        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.channel.send(language("MISSING_PERMISSION_MANAGE_MESSAGES"));
        }

        const CFilter = m => m.mentions.channels.first(),
        MFilter = m => m.content,
        RCFilter = m => m.mentions.roles.first() || m.content === "cancel"

        message.channel.send(language("GIVEAWAY_CONFIG_CHANNEL")).then(() => {
            message.channel.awaitMessages(CFilter, { max: 1, time: 30000, errors: ['time'] })
                .then(Ccollected => {
                    let giveawayChannel = Ccollected.first().mentions.channels.first()

                    message.channel.send(language("GIVEAWAY_CONFIG_DURATION")).then(() => {
                        message.channel.awaitMessages(MFilter, { max: 1, time: 30000, errors: ['time'] })
                            .then(Dcollected => {
                                let giveawayDuration = Dcollected.first().content

                                message.channel.send(language("GIVEAWAY_CONFIG_NW")).then(() => {
                                    message.channel.awaitMessages(MFilter, { max: 1, time: 30000, errors: ['time'] })
                                        .then(NWcollected => {
                                            let giveawayNumberWinners = NWcollected.first().content.slice(0).trim().split(/ +/g)[0]

                                            message.channel.send(language("GIVEAWAY_CONFIG_PRIZE")).then(() => {
                                                message.channel.awaitMessages(MFilter, { max: 1, time: 30000, errors: ['time'] })
                                                    .then(Pcollected => {
                                                        let giveawayPrize = Pcollected.first().content

                                                        message.channel.send(language("GIVEAWAY_CONFIG_ROLE") + "\n" + language("GIVEAWAY_CONFIG_RR_CANCEL")).then(() => {
                                                            message.channel.awaitMessages(RCFilter, { max: 1, time: 30000, errors: ['time'] })
                                                                .then(RCcollected => {

                                                                    let roleCondition = null
                                                                    if (RCcollected.first().content != "cancel") {
                                                                        roleCondition = RCcollected.first().mentions.roles.first()
                                                                    }

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
                                                                       },
                                                                       extraData: { roles: [ roleCondition.id ], guilds: [] },
                                                                      });
                                                               
                                                                      message.channel.send({embed: {color: '0x00FF46', description: `${client.config.emojis.yes} | ${language("GIVEAWAY_GO")}${giveawayChannel} !` }}).catch(e => {
                                                                       return client.emit('error',e, "start-giveaway");
                                                                      });
                                                                })
                                                                .catch(RCcollected => {
                                                                    message.channel.send(language("GIVEAWAY_CONFIG_TIME"));
                                                                });
                                                        });
                                                    })
                                                    .catch(Pcollected => {
                                                        message.channel.send(language("GIVEAWAY_CONFIG_TIME"));
                                                    });
                                            });

                                        })
                                        .catch(NWcollected => {
                                            message.channel.send(language("GIVEAWAY_CONFIG_TIME"));
                                        });
                                });

                            })
                            .catch(Dcollected => {
                                message.channel.send(language("GIVEAWAY_CONFIG_TIME"));
                            });
                    });

                })
                .catch(Ccollected => {
                    message.channel.send(language("GIVEAWAY_CONFIG_TIME") + ".");
                });
        });

        /*

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
        console.log(roleCondition)

        let giveawayPrize = args.slice(numPlace).join(' ');

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
        },
        extraData: { roles: [ roleCondition.id ], guilds: [] },
       });

       message.channel.send({embed: {color: '0x00FF46', description: `${client.config.emojis.yes} | ${language("GIVEAWAY_GO")}${giveawayChannel} !` }}).catch(e => {
        return client.emit('error',e, "start-giveaway");
       });

    */
    }
}

module.exports = new CreateGiveaway;