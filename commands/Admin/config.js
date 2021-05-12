const Command = require("../../structure/Command.js");

class Config extends Command {
    constructor() {
        super({
            name: 'config',
            aliases: ['configuration'],
            category: 'admin',
            description: "Affiche un message pour savoir ou configurer le bot.",
            usage: 'config'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        const Embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(language("CONFIG_EMBED_TITLE"))
        .setURL(client.url)
        .setAuthor(message.author.username, message.author.avatarURL(), client.url)
        .setThumbnail(client.user.displayAvatarURL({format: 'png'}))
        .setDescription(
            language("CONFIG_EMBED_DESC_1") +
            language("CONFIG_EMBED_DESC_2") +
            language("CONFIG_EMBED_DESC_3") + "\n\n" +
            language("DASHCONFIG")
        )
        .setTimestamp()
        .setFooter(client.footer,  client.user.displayAvatarURL({format: 'png'}));
    
        message.channel.send(Embed).then(msgReact => {
            msgReact.react("675367617250328598")
            msgReact.react("788834570447487006").then(msg => {
                msg = msg.message

                const collector = msg.createReactionCollector((reaction, user) => reaction.emoji.id, { time: 300000 });

                collector.on('collect', col => {

                    if (col.emoji.name === "help") {

                        message.channel.send(language("CONFIG_PREFIX")).then(mm => {
                            message.channel.awaitMessages(m => m.content, { max: 1, time: 120000, errors: ['time'] })
                            .then(async collected => {
                                collected = collected.first()
                                let prefix = collected.content
                                if(prefix.length > 3) return msg.channel.send(language("CONFIG_PREFIX_ERROR"))
                                message.channel.send(language("CONFIG_NEW_PREFIX").replace("{prefix}", prefix)).then(() => {
                                    mm.delete() && collected.delete()
                                })
                                db.prefix = prefix.split(' ')[0];
                                await db.save();
                            });
                        })

                    } else if (col.emoji.name === "englishflag") {
                        message.channel.send(language("CONFIG_LANG")).then(mm => {
                            mm.react("788834553002983455")
                            mm.react("788834570447487006").then(msgL => {
                                msgL = msgL.message
                                const Lcollector = msgL.createReactionCollector((reaction, user) => reaction.emoji.id, { time: 120000 });

                                Lcollector.on('collect', async Lcol => {
                                    if (Lcol.emoji.name === "frenchflag") {
                                        message.channel.send(language("CONFIG_LANG_FR")).then(() => {
                                            mm.delete()
                                        })
                                        db.lang = "french";
                                        await db.save();
                                    } else if (Lcol.emoji.name === "englishflag") {
                                        message.channel.send(language("CONFIG_LANG_EN")).then(() => {
                                            mm.delete()
                                        })
                                        db.lang = "english";
                                        await db.save();
                                    }
                                })
                            })
                        })
                    }
                });
        
                collector.on('end', col => {
                    message.channel.send(language("CONFIG_TIME"))
                });

            })
        });
    }
}

module.exports = new Config;