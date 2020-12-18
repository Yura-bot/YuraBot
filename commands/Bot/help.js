const Command = require('../../structure/Command')

class Help extends Command {
    constructor() {
        super({
            name: 'help',
            category: 'bot',
            description: "Permet d'obtenir les commandes disponibles.",
            usage: 'help'
        });
    }

    run(client, message, args) {

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

        if(!args[1]) {
            message.channel.send({
                embed: {
                    title: ":pushpin: Aide Yura'Bot",
                    thumbnail: {
                        url: client.user.displayAvatarURL({format: 'png'})
                    },
                    description: "Pour **plus d'informations** sur une commande:\n" + 
                      "[»](" + client.url + ") `" + prefix + "help [command]`\n\n" +
                      `Nombre de commandes : **${client.commands.size}** \n` +
                      `Prefix sur ce serveur : **${prefix}** \n\n` +
                      "__**Voici la liste des commandes :**__  \n\n",
                    fields: [
                        {
                            name: '<:adminsettingsmale:675368904637546506> » Commandes Administration : (**' + client.commands.filter((command) => command.category === 'admin').size + '**)',
                            value: client.commands.filter((command) => command.category === 'admin').map((command) => "`" + command.name + "`").join(', ')
                        },
                        {
                            name: ':rotating_light: » Commandes Modération : (**' + client.commands.filter((command) => command.category === 'mod').size + '**)',
                            value: client.commands.filter((command) => command.category === 'mod').map((command) => "`" + command.name + "`").join(', ')
                        },
                        {
                            name: ':gear: » Commandes Utilitaires : (**' + client.commands.filter((command) => command.category === 'utils').size + '**)',
                            value: client.commands.filter((command) => command.category === 'utils').map((command) => "`" + command.name + "`").join(', ')
                        },
                        {
                            name: ':tada: » Commandes Fun : (**' + client.commands.filter((command) => command.category === 'fun').size + '**)',
                            value: client.commands.filter((command) => command.category === 'fun').map((command) => "`" + command.name + "`").join(', ')
                        },
                        {
                            name: ':notes: » Commandes Musique : (**' + client.commands.filter((command) => command.category === 'music').size + '**)',
                            value: client.commands.filter((command) => command.category === 'music').map((command) => "`" + command.name + "`").join(', ')
                        },
                        {
                            name: ':gift: » Commandes de Giveaways : (**' + client.commands.filter((command) => command.category === 'giveaway').size + '**)',
                            value: client.commands.filter((command) => command.category === 'giveaway').map((command) => "`" + command.name + "`").join(', ')
                        },
                        {
                            name: ':sunrise_over_mountains: » Commandes Images : (**' + client.commands.filter((command) => command.category === 'images').size + '**)',
                            value: client.commands.filter((command) => command.category === 'images').map((command) => "`" + command.name + "`").join(', ')
                        },
                        {
                            name: ':video_game: » Commandes De Jeux : (**' + client.commands.filter((command) => command.category === 'game').size + '**)',
                            value: client.commands.filter((command) => command.category === 'game').map((command) => "`" + command.name + "`").join(', ')
                        },
                        {
                            name: ':underage: » Commandes NSFW : (**' + client.commands.filter((command) => command.category === 'NSFW').size + '**)',
                            value: client.commands.filter((command) => command.category === 'NSFW').map((command) => "`" + command.name + "`").join(', ')
                        },
                        {
                            name: ':robot: » Commandes bot : (**' + client.commands.filter((command) => command.category === 'bot').size + '**)',
                            value: client.commands.filter((command) => command.category === 'bot').map((command) => "`" + command.name + "`").join(', ')
                        },
                        {
                            name: '🔗 • __Liens__ :',
                            value: "[Site](https://yurabot.xyz) | [Inviter le bot](https://discordapp.com/oauth2/authorize?client_id=662775890194989066&scope=bot&permissions=2146958847) | [Serveur Support](https://discord.gg/etQ3uJN) | [Dashboard](https://dash.yurabot.xyz) | [Status](https://yurabot.xyz/status)"
                        }
                    ],
                    url: client.url,
                    color: client.color,
                    timestamp: new Date(),
                    footer: {
                        text: client.footer,
                        icon_url: client.user.displayAvatarURL({format: 'png'})
                    }
                }
            })
        } else {
            if(client.commands.has(args[1]) && client.commands.get(args[1]).category !== 'secret') {
                const command = client.commands.get(args[1]);

                let Aliases;
                let Desc;
                if (!command.aliases) {
                    Aliases = command.aliases
                    Desc = command.description;
                } else { 
                    Aliases = "Aucune aliases pour cette commande."
                    Desc = "Aucune description pour cette commande."
                }

                message.channel.send({
                    embed: {
                        title: ":question: Aide sur la commande '"+command.name+"'",
                        description: "⇝ Légende pour l'utilisation:\n" +
                            "() : Optionnel | [] : Obligatoire",
                        fields: [
                            {
                                name: '• Nom de la commande :',
                                value: "[»]("+client.url+") " + command.name,
                                inline: true
                            },
                            {
                                name: '• Utilisation :',
                                value: "[»]("+client.url+") " + command.usage,
                                inline: true
                            },
                            {
                                name: '• Description de la commande :',
                                value: "[»]("+client.url+") " + Desc,
                                inline: false
                            },
                            {
                                name: '• Aliase(s) de la commande :',
                                value: "[»]("+client.url+") " + Aliases,
                                inline: false
                            }
                        ],
                        url: client.url,
                        color: client.color,
                        timestamp: new Date(),
                        footer: {
                            text: client.footer,
                            icon_url: client.user.displayAvatarURL({format: 'png'})
                        }
                    }
                })
            }
        }
    }
}

module.exports = new Help;