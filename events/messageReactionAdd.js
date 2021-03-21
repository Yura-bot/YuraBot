module.exports = async(client, reaction, user) => {
    if(user.bot) return;
    const Discord = require("discord.js");

    let db = await client.db.getGuild(reaction.message.guild.id)

    let guildLanguage = !db.lang ? "english": db.lang;
    let language = require(`../languages/${guildLanguage}`);

    let reactionRolesDB = await client.db.getReactionRoles(reaction.message.id, false)
    if (reactionRolesDB) addRole(reaction.message, reaction.emoji, user, reactionRolesDB, language)

    let isTicket = db.tickets.enabled
    if (isTicket === false) return;

    const guild = reaction.message.guild;

    let categorieId = db.tickets.category
    let channelId = db.tickets.channel
    let logId = false
    let staffId = db.tickets.role

    if (client.channels.cache.has(categorieId) && client.channels.cache.has(channelId))
    if (guild.roles.cache.has(staffId) === false) return reaction.message.guild.owner.send(language("TICKET_ERROR")).catch(e => {});

    switch (reaction.message.channel.id) {
        case channelId:
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
                        title: language("TICKET_CHANNEL_TITLE").replace("{user}", user.tag),
                        description: language("TICKET_CHANNEL_TITLE").replace("{user}", user.username) +
                        language("TICKET_CHANNEL_DESC_2").replace("{ticketName}", ticketName),
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
            reaction.message.react("712662632200667266"),
            reaction.message.react("712662704526983230")
        ])

        reaction.message.awaitReactions((r, u) => u.id === user.id && (r.emoji.id === "712662632200667266" || r.emoji.id === "712662704526983230"), {
            max: 1
        }).then(collected => {
            if(collected.first().emoji.id !== "712662632200667266") {
                Promise.all([
                    reaction.message.reactions.resolve("712662704526983230").remove(),
                    reaction.message.reactions.resolve("712662632200667266").remove()
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
                })
                .catch(e => {});
            }
        })
    }
}

async function addRole(message, emoji, user, db, language) {
    if (user.bot || message.id !== db.messageId) return;
  
    if (message.partial) {
      try {
        await message.fetch();
      } catch (err) {
        return member.send(language("RR_ROLE_ERROR_FETCH_MSG")).catch(e => {});
      }
    }
  
    let member = message.guild.members.cache.get(user.id);
    let role = message.guild.roles.cache.get(db.data[emoji.name]);

    let emojiID = emoji.id
    if (emojiID) role = message.guild.roles.cache.get(db.data[emoji.id]);
  
    if (!role) return member.send(language("RR_ROLE_NO_FOUND")).catch(e => {});
    
    try {
        member.roles.add(role.id);
    } catch (err) {
        return member.send(language("RR_ROLE_MEMBER_ADMIN")).catch(e => {});
    }
}
