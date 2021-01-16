module.exports = async(client, reaction, user) => {
    if(user.bot) return;
    const Discord = require("discord.js");

    let db = await client.db.getGuild(reaction.message.guild.id)

    let guildLanguage = !db.lang ? "english": db.lang;
    let language = require(`../languages/${guildLanguage}`);

    let isTicket = db.tickets.enabled
    if (isTicket === false) return;

    const guild = reaction.message.guild;

    let categorieId = db.tickets.category
    let channelId = db.tickets.channel
    let messageId = db.tickets.message
    let logId = false
    let staffId = db.tickets.role


    if (client.channels.cache.has(categorieId) && client.channels.cache.has(channelId))
    if (guild.roles.cache.has(staffId) === false) return reaction.message.guild.owner.send(language("TICKET_ERROR")).catch(e => {});

    switch (reaction.message.channel.id) {
        case channelId:
            if(reaction.message.id !== messageId) return;
            if(reaction.emoji.name !== '🎟') return;

            reaction.message.reactions.resolve('🎟').users.remove(user.id).then();

            let userName = user.username+user.discriminator
            userName = userName.toLowerCase()

            if(client.channels.cache.find(c => c.name === 'ticket-'+userName)) return;
            
            guild.channels.create("ticket-" + userName, {
                parent: categorieId,
                permissionOverwrites: [
                    {
                        id: guild.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: staffId, 
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: user.id,
                        allow: ["VIEW_CHANNEL"]
                    }
                ]
            }).then(ticketChannel => {
                let ticketName = userName;

                user.send({
                    embed: {
                        title: language("TICKET_OPEN_TITLE"),
                        description: language("TICKET_OPEN_DESC") +
                            "**↳** "+ticketChannel.toString(),
                        url: client.url,
                        color: '2ECC71',
                        timestamp: new Date()
                    }
                }).catch(e => {});

                /*
                if (client.channels.cache.has(logId) === true && logId) {

                    client.channels.cache.get(logId).send({
                        embed: {
                            description: ":unlock: **»** **"+user.tag+"** vient d'ouvrir une demande.",
                            color: '2ECC71'
                        }
                    }).catch(e => {});

                }
                */

                ticketChannel.send({
                    embed: {
                        title: language("TICKET_CHANNEL_TITLE", user.tag),
                        description: language("TICKET_CHANNEL_TITLE", user.username) +
                        language("TICKET_CHANNEL_DESC_2", ticketName),
                        thumbnail: {
                            url: user.displayAvatarURL({format: 'png', dynamic: true})
                        },
                        fields: [
                            {
                                name: language("TICKET_CHANNEL_FIELD_1"),
                                value: user.username + " - `" + user.tag + "`"
                            },
                            {
                                name: language("TICKET_CHANNEL_FIELD_2"),
                                value: user.id ,
                            }
                        ],
                        url: client.url,
                        color: "36393f",
                        timestamp: new Date(),
                        footer: {
                            text: client.footer,
                            icon_url: client.user.displayAvatarURL({format: 'png'})
                        }
                    }
                }).then(ticketEmbedMessage => {
                    ticketEmbedMessage.react('🔒');
                }).catch(e => {});
            }).catch(e => {});
            break;
    }

    if(reaction.message.channel.parentID === categorieId) {
        if(reaction.emoji.name !== '🔒') return;
        
        reaction.message.reactions.resolve('🔒').users.remove(user.id)
        Promise.all([
            reaction.message.react(client.config.emojis.yes),
            reaction.message.react(client.config.emojis.no)
        ])

        reaction.message.awaitReactions((r, u) => u.id === user.id && (r.emoji.id === client.config.emojis.yes || r.emoji.id === client.config.emojis.no), {
            max: 1
        }).then(collected => {
            if(collected.first().emoji.id !== client.config.emojis.yes) {
                Promise.all([
                    reaction.message.reactions.resolve(client.config.emojis.no).remove(),
                    reaction.message.reactions.resolve(client.config.emojis.yes).remove()
                ])
            } else {
                return reaction.message.channel.delete()
                .then(() => {
                    user.send({
                        embed: {
                            title: language("TICKET_CLOSE_TITLE"),
                            description: language("TICKET_CLOSE_DESC"),
                            url: client.url,
                            color: 'E74C3C',
                            timestamp: new Date()
                        }
                    }).catch(e => {});

                    /*
                    if (client.channels.cache.has(logId) === true && logId) {
                        client.channels.cache.get(logId).send({
                            embed: {
                                description: ":lock: **»** **"+user.tag+"** vient de fermer la demande de **"+client.users.cache.get(ticketName).tag+"**.",
                                color: 'E74C3C'
                            }
                        }).catch(e => {});
                    }
                    */
                });
                
            }
        })
    }
}