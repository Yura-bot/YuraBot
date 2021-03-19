const Command = require("../../structure/Command.js");

class ReactionRoles extends Command {
    constructor() {
        super({
            name: 'reaction-roles',
            aliases: ['react-roles', 'rr', 'r-r'],
            category: 'admin',
            description: 'Permet de crée un message de réaction.',
            usage: 'react-roles [add/delete/list]'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        const reactionRolesDBGlobal = await client.db.getReactionRoles(false, message.guild.id)

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if(!message.member.hasPermission("ADMINISTRATOR")) {
            const error_permissions = new Discord.MessageEmbed()
                .setDescription(language("MISSING_PERMISSION_ADMINISTRATOR"))
                .setColor("#F43436")
            return message.channel.send(error_permissions)
        }

        if(!args[1]) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_RR"));

        if (args[1] === "add") {

            let MessageID = args[2]
            let Emoji = args[3]
            let Role = args[4]
    
            if(MessageID === undefined || Emoji === undefined || Role === undefined) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_RR_ADD"));

            const reactionRolesDB = await client.db.getReactionRoles(MessageID, false)

            message.channel.messages.fetch(MessageID)
            .then(async msg => {
                let role = message.guild.roles.cache.get(Role) || message.mentions.roles.first();
                if (role) {
                    msg.react(Emoji).catch(e => { return message.channel.send(language("RR_ERROR_EMOJI")); })

                    let emoji = client.emojis.cache.get(message.guild.emojis.resolveIdentifier(Emoji).split('%3A')[1])
                    if (emoji) Emoji = emoji.id

                    let addData = {
                        [Emoji]: role.id
                    }

                    if (reactionRolesDB) {
                        let actualData = reactionRolesDB.data
                        let merge = Object.assign(actualData, addData);

                        reactionRolesDB.data = merge

                        reactionRolesDB.markModified("data");
                        await reactionRolesDB.save();
                    } else {
                        await client.db.createReactionRoles(MessageID, message.guild.id, false, addData)
                    }

                } else {
                    return message.channel.send(language("RR_MSG_NO_ROLE"));
                }
            })
            .catch(e => { message.channel.send(language("RR_MSG_NO_CHANNEL")); })

            return message.channel.send({embed: {color: '0x00FF46', description: `${client.config.emojis.yes} | ${language("RR_UPDATE_SUCESS")}` }})

        } else if (args[1] === "delete") {

            let MessageID = args[2]
            let Emoji = args[3]
    
            if(MessageID === undefined) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_RR_DELETE"));

            const reactionRolesDB = await client.db.getReactionRoles(MessageID, false)

            //A FINIR

        } else if (args[1] === "list") {

            //A FINIR
            
            message.channel.send({
                embed: {
                    title: language("RR_EMBED_TITLE"),
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
        }
    }
}

module.exports = new ReactionRoles;