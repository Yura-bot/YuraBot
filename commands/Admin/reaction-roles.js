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

        if(!message.member.permissions.has("ADMINISTRATOR")) {
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
                        if (reactionRolesDBGlobal.length === 5) return message.channel.send(language("RR_LIMIT"));
                        else await client.db.createReactionRoles(MessageID, message.guild.id, false, addData)
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
            if (!reactionRolesDB) return message.channel.send(language("RR_MSG_NO_FOUND"));

            if (!Emoji) {
                await client.db.deleteReactionRoles(MessageID, false)
                return message.channel.send({embed: {color: '0x00FF46', description: `${client.config.emojis.yes} | ${language("RR_DELETE_SUCESS")}` }})
            } else {

                let emoji = client.emojis.cache.get(message.guild.emojis.resolveIdentifier(Emoji).split('%3A')[1])
                if (emoji) Emoji = emoji.id

                let dataBefore = reactionRolesDB.data

                delete dataBefore[Emoji]

                reactionRolesDB.markModified("data");
                await reactionRolesDB.save();

                return message.channel.send({embed: {color: '0x00FF46', description: `${client.config.emojis.yes} | ${language("RR_DELETE_SUCESS_EMOJI")}` }})
            }

        } 

        /*
        else if (args[1] === "list") {

            console.log(reactionRolesDBGlobal)

            const Embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setURL(client.url)
            .setTitle(language("RR_EMBED_TITLE"))
            .setAuthor(message.author.username, message.author.avatarURL(), client.url)
            .setDescription(language("RR_EMBED_DESC"))
            .setTimestamp()
            .setFooter(client.footer, client.user.displayAvatarURL({format: 'png'}));

            reactionRolesDBGlobal.forEach(element =>  {
                Embed.addField('N°(num)', "")
            });
        
            message.channel.send({ embeds: [embed] });
            //.catch(e => {});

        }
        */
    }
}

module.exports = new ReactionRoles;