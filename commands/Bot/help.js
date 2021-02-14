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

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if(!args[1]) {
            message.channel.send({
                embed: {
                    title: language("HELP_YURA"),
                    thumbnail: {
                        url: client.user.displayAvatarURL({format: 'png'})
                    },
                    description: language("HELP_INFOS") + 
                      "[»](" + client.url + ") `" + prefix + "help [command]`\n\n" +
                      language("HELP_TITLE").replace("{CS}", client.commands.size) + 
                      language("HELP_PREFIX").replace("{prefix}", prefix) +
                      language("HELP_LISTCMDS"),
                    fields: [
                        {
                            name: language("HELP_ADMIN") + client.commands.filter((command) => command.category === 'admin').size + '**)',
                            value: client.commands.filter((command) => command.category === 'admin').map((command) => "`" + command.name + "`").join(', ')
                        },
                        {
                            name: language("HELP_MOD") + client.commands.filter((command) => command.category === 'mod').size + '**)',
                            value: client.commands.filter((command) => command.category === 'mod').map((command) => "`" + command.name + "`").join(', ')
                        },
                        {
                            name: language("HELP_UTIL") + client.commands.filter((command) => command.category === 'utils').size + '**)',
                            value: client.commands.filter((command) => command.category === 'utils').map((command) => "`" + command.name + "`").join(', ')
                        },
                        {
                            name: language("HELP_FUN") + client.commands.filter((command) => command.category === 'fun').size + '**)',
                            value: client.commands.filter((command) => command.category === 'fun').map((command) => "`" + command.name + "`").join(', ')
                        },
                        {
                            name: language("HELP_MUSIC") + client.commands.filter((command) => command.category === 'music').size + '**)',
                            value: client.commands.filter((command) => command.category === 'music').map((command) => "`" + command.name + "`").join(', ')
                        },
                        {
                            name: language("HELP_GIVEAWAY") + client.commands.filter((command) => command.category === 'giveaway').size + '**)',
                            value: client.commands.filter((command) => command.category === 'giveaway').map((command) => "`" + command.name + "`").join(', ')
                        },
                        {
                            name: language("HELP_IMG") + client.commands.filter((command) => command.category === 'images').size + '**)',
                            value: client.commands.filter((command) => command.category === 'images').map((command) => "`" + command.name + "`").join(', ')
                        },
                        {
                            name: language("HELP_GAME") + client.commands.filter((command) => command.category === 'game').size + '**)',
                            value: client.commands.filter((command) => command.category === 'game').map((command) => "`" + command.name + "`").join(', ')
                        },
                        {
                            name: language("HELP_NSFW") + client.commands.filter((command) => command.category === 'NSFW').size + '**)',
                            value: client.commands.filter((command) => command.category === 'NSFW').map((command) => "`" + command.name + "`").join(', ')
                        },
                        {
                            name: language("HELP_BOT") + client.commands.filter((command) => command.category === 'bot').size + '**)',
                            value: client.commands.filter((command) => command.category === 'bot').map((command) => "`" + command.name + "`").join(', ')
                        },
                        {
                            name: language("HELP_LINKS"),
                            value: `[${language("HELP_WEBSITE")}](https://yurabot.xyz) | [${language("HELP_INVITEBOT")}](https://discordapp.com/oauth2/authorize?client_id=662775890194989066&scope=bot&permissions=2146958847) | [${language("HELP_SERVSUPPORT")}](https://discord.gg/etQ3uJN) | [Dashboard](https://dash.yurabot.xyz) | [Status](https://yurabot.xyz/status)`
                        }
                    ],
                    url: client.url,
                    color: client.color,
                    image: {
                        url: 'https://i.goopics.net/9yqqy.gif',
                    },
                    timestamp: new Date(),
                    footer: {
                        text: client.footer,
                        icon_url: client.user.displayAvatarURL({format: 'png'})
                    }
                }
            }).catch(e => {});
        } else {
            if(client.commands.has(args[1]) && client.commands.get(args[1]).category !== 'secret') {
                const command = client.commands.get(args[1]);

                let Aliases;
                let Desc;

                if (command.aliases.length === 0) {
                    Aliases = language("HELPCMD_NOALIASES")
                } else { 
                    Aliases = command.aliases
                }

                if (command.description) {
                    Desc = command.description;
                } else {
                    Desc = language("HELPCMD_NODESC")
                }

                message.channel.send({
                    embed: {
                        title: language("HELPCMD_TITLE")+command.name+"'",
                        description: language("HELPCMD_LEGENDE") +
                          language("HELPCMD_LEGENDE_2"),
                        fields: [
                            {
                                name: language("HELPCMD_NAMECMD"),
                                value: "↳ " + command.name,
                                inline: false
                            },
                            {
                                name: language("HELPCMD_UTILISATIONCMD"),
                                value: "↳ " + command.usage,
                                inline: false
                            },
                            {
                                name: language("HELPCMD_DESCCMD"),
                                value: "↳ " + Desc,
                                inline: false
                            },
                            {
                                name: language("HELPCMD_ALIASESCMD"),
                                value: "↳ " + Aliases,
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