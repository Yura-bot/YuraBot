const Command = require("../../structure/Command.js");

class RockstarGameStatus extends Command {
    constructor() {
        super({
            name: 'rockstar-games-status',
            aliases: ['rgs', 'rockstar-status'],
            category: 'game',
            description: "Permet de voir le status des jeux de rockstar.",
            usage: 'rockstar-games-status'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");
        const axios = require("axios")

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);
        
        axios.get(`https://support.rockstargames.com/fr/services/status.json`)
        .then((response) => {
          if (response.status === 200) {

            let res = response.data.statuses

            let statusDedReadOnline = res[0].status_tag;
            let statusGrandTheftAuto = res[1].status_tag;
            let statusSocialClub = res[2].status_tag;
            let statusRockStarLauncher = res[3].status_tag;

            if (statusDedReadOnline === "Actif") statusDedReadOnline = client.config.emojis.online+language("RGS_ONLINE")
            else statusDedReadOnline =  client.config.emojis.dnd+language("RGS_OFFLINE")
            if (statusGrandTheftAuto === "Actif") statusGrandTheftAuto = client.config.emojis.online+language("RGS_ONLINE")
            else statusGrandTheftAuto =  client.config.emojis.dnd+language("RGS_OFFLINE")
            if (statusSocialClub === "Actif") statusSocialClub = client.config.emojis.online+language("RGS_ONLINE")
            else statusSocialClub =  client.config.emojis.dnd+language("RGS_OFFLINE")
            if (statusRockStarLauncher === "Actif") statusRockStarLauncher = client.config.emojis.online+language("RGS_ONLINE")
            else statusRockStarLauncher =  client.config.emojis.dnd+language("RGS_OFFLINE")

            message.channel.send({
                embed: {
                    title: language("RGS_TITLE"),
                    fields: [
                        {
                            name: "1 » Red Dead Online : ",
                            value: statusDedReadOnline
                        },
                        {
                            name: "1 » Grand Theft Auto Online: ",
                            value: statusGrandTheftAuto
                        },
                        {
                            name: "1 » Social Club : ",
                            value: statusSocialClub
                        },
                        {
                            name: "1 » Rockstar Games Launcher : ",
                            value: statusRockStarLauncher
                        },
                    ],
                    url: client.url,
                    color: client.color,
                    timestamp: response.data.updated,
                    footer: {
                        text: client.footer,
                        icon_url: client.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
                    }
                }
            }).catch(e => {
                return client.emit('error',e, "rockstar-gamestatus");
            });
            
          } else {
              message.channel.send("Error")
          }
        });

        return;
    }
}

module.exports = new RockstarGameStatus;