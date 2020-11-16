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

    async run(client, message, args) {

        const Discord = require("discord.js");
        const axios = require('axios');
        
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
        
        axios.get(`https://support.rockstargames.com/fr/services/status.json`)
        .then((response) => {
            console.log(response.data.statuses)
          if (response.status === 200) {

            message.channel.send({
                embed: {
                    title: "<:rockstar:777553264882352188> Status des jeux rockstar : ",
                    fields: [
                        {
                            name: "1 » Red Dead Online : ",
                            value: response.data.statuses
                        },
                        {
                            name: "1 » Grand Theft Auto Online: ",
                            value: response.data.statuses
                        },
                        {
                            name: "1 » Social Club : ",
                            value: response.data.statuses
                        },
                        {
                            name: "1 » Rockstar Games Launcher' : ",
                            value: response.data.statuses
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
                return client.emit('error',e, "mc-achivement");
            });
            
          } else {
              message.channel.send("Unvalable")
          }
        });

        return;
    }
}

module.exports = new RockstarGameStatus;