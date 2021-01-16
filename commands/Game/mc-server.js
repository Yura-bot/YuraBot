const Command = require("../../structure/Command.js");

class McServer extends Command {
    constructor() {
        super({
            name: 'mc-server',
            aliases: ['m-s'],
            category: 'game',
            description: "Permet de voir toutes les informations d'un serveur minecraft.",
            usage: 'mc-server [server]'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");
        const axios = require("axios")

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        let contenu = args[1];
        if (!contenu) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_MC_SERVER"));

        axios.get(`https://api.mcsrvstat.us/2/${contenu}`)
        .then((response) => {
          if (response.status === 200 && response.data.debug.ping === true) {

            let status;
            let iconStatus;
            let color;
            if (response.data.motd.clean != "Server not found.") {
                status = language("ONLINE")
                iconStatus = "<:online:721002621649027193>"
                color = "GREEN"
            } else {
                status = language("OFFLINE")
                iconStatus = "<:dnd:721002560625967185>"
                color = "RED"
            }

            message.channel.send({
                embed: {
                    title: "<a:grassblock:775037113536217099> Serveur Minecraft : "+response.data.hostname,
                    thumbnail: {
                        url: `https://eu.mc-api.net/v3/server/favicon/${response.data.hostname}`
                    },
                    fields: [
                        {
                            name: "🔧 » IP : ",
                            value: response.data.ip
                        },
                        {
                            name: "<:rootserver:675371134710972429> » Port : ",
                            value: response.data.port 
                        },
                        {
                            name: iconStatus + " » Status : ",
                            value: status
                        },
                        {
                            name: "<:horizontalsettingsmixer:675372744950677534> » Version : ",
                            value: response.data.version
                        },
                        {
                            name: language("MC_SERVER_ONLINE_PLAYER"),
                            value: response.data.players.online
                        },
                        {
                            name: "<:editproperty:675370831127248906> » Motd : ",
                            value: response.data.motd.clean
                        },
                    ],
                    url: client.url,
                    color: color,
                    timestamp: new Date(),
                    footer: {
                        text: client.footer,
                        icon_url: client.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
                    }
                }
            }).catch(e => {
                return client.emit('error',e, "mc-achivement");
            });
            
          } else {
              message.channel.send(language("MC_SERVER_NO_FOUND"))
          }
        })
        .catch(e => {
            return message.channel.send(language("MC_SERVER_NO_FOUND"))
        });

        return;
    }
}

module.exports = new McServer;