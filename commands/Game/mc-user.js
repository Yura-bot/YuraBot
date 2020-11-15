const Command = require("../../structure/Command.js");

class McUser extends Command {
    constructor() {
        super({
            name: 'mc-user',
            aliases: ['m-u'],
            category: 'game',
            description: "Permet de voir toutes les informations d'un joueur minecraft.",
            usage: 'mc-user [Pseudo]'
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

        let pseudo = args[1];
        if (!pseudo) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_MC_USER"));

        axios.get(`https://minecraft-api.com/api/uuid/${pseudo}/json`)
        .then((response) => {
          if (response.status === 200 && response.statusText === "OK" && response.data != 'Player not found !' && response.data != ' ') {

            message.channel.send({
                embed: {
                    title: "<:minecraftsword:675369153833467930> Joueur minecraft : "+pseudo,
                    thumbnail: {
                        url: `https://visage.surgeplay.com/face/${response.data.uuid}`
                    },
                    fields: [
                        {
                            name: language("MC_USER_NAME"),
                            value: pseudo
                        },
                        {
                            name: "<:horizontalsettingsmixer:675372744950677534> » UUID : ",
                            value: response.data.uuid
                        },
                        {
                            name: "<:tagwindow:675369476509663256> » NameMC profile : ",
                            value: `https://mine.ly/${pseudo}.1`
                        },
                        {
                            name: language("MC_USER_GET_HEAD"),
                            value: '**1.12− :** `/give @p minecraft:skull 1 3 {SkullOwner:"'+pseudo+'"}` \n **1.13+ :** `/give @s minecraft:player_head{SkullOwner:"'+pseudo+'"}`'
                        }
                    ],
                    url: client.url,
                    color: client.color,
                    timestamp: new Date(),
                    footer: {
                        text: client.footer,
                        icon_url: client.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
                    }
                }
            }).catch(e => {
                return client.emit('error',e, "mc-user");
            });
            
          } else {
              message.channel.send(language("MC_USER_NO_FOUND"))
          }
        })
        .catch(e => {
            message.channel.send(language("MC_USER_NO_FOUND"))
        });

        return;
    }
}

module.exports = new McUser;