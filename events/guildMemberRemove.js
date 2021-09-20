module.exports = async(client, member) => {

    let db = await client.db.getGuild(member.guild.id)

    let guildLanguage = !db.lang ? "english": db.lang;
    let language = require(`../languages/${guildLanguage}`);

    let goodbyeEnabled = db.goodbye.enabled

    if (goodbyeEnabled) {

        let goodbyeChannel = db.goodbye.channel
        let goodbyeMessage = db.goodbye.message

        let goodbyeEmbed = db.goodbye.withEmbed
        let goodbyeImage = db.goodbye.withImage

        if(client.channels.cache.has(goodbyeChannel) === false){
            return member.guild.owner.send(language("EVENTS_GUILDMEMBERREMOVE_GOODBYE_ERROR")).catch(e => {});
        }

        let messageSend = goodbyeMessage
        .replace('{member}', member)
        .replace('{user}', member.user.username)
        .replace('{tag}', member.user.tag)
        .replace('{memberid}', member.user.id)
        .replace('{server}', member.guild.name)
        .replace('{membercount}', member.guild.memberCount)

        if (goodbyeEmbed) {
            if (goodbyeImage) {
                const Canvas = require("discord-canvas"),
                Discord = require("discord.js"),
                Clean = require('js-string-cleaner');

                let color = db.goodbye.config.colorBackground
                let colorTitle = db.goodbye.config.colorTitle

                let imageURL = db.goodbye.config.img

                if (imageURL != null && client.isURL(imageURL)) {
                    imageURL = db.goodbye.config.img
                } else imageURL = "https://image.noelshack.com/fichiers/2020/28/5/1594371011-welcome-image.png"

                const image = await new Canvas.Goodbye()
                .setUsername(Clean(member.user.username))
                .setDiscriminator(member.user.discriminator)
                .setMemberCount(member.guild.memberCount)
                .setGuildName(member.guild.name)
                .setAvatar(member.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                .setColor("border", color)
                .setColor("username-box", color)
                .setColor("discriminator-box", color)
                .setColor("message-box", color)
                .setColor("title", colorTitle)
                .setColor("avatar", color)
                .setOpacity("username-box", 0.4)
                .setOpacity("discriminator-box", 0.4)
                .setOpacity("message-box", 0.4)
                .setOpacity("border", 1)
                .setBackground(imageURL)
                .setText("title", language("GOODBYE"))
                .setText("message", language("GOODBYE_ON"))
                .setText("member-count", language("MEMBER_COUNT"))
                .toAttachment();
            
                const attachment = new Discord.MessageAttachment(image.toBuffer(), "goodbye-image.png")

                const embed = {
                    color: colorTitle,
                    title: messageSend,
                    image: {
                        url: 'attachment://goodbye-image.png',
                    },
                    timestamp: new Date(),
                    footer: {
                      text: language("EVENTS_GUILDMEMBERADD_WELCOME_EMBED_FOOTER").replace(/{memberCount}/ig, member.guild.memberCount),
                      icon_url: client.user.displayAvatarURL({format: 'png'})
                    },
                };

                client.channels.cache.get(goodbyeChannel).send(({ files: [attachment], embeds: [embed] })).catch(e => {});
            } else {
                const embed = {
                    color: "NONE",
                    title: messageSend,
                    timestamp: new Date(),
                    footer: {
                      text: language("EVENTS_GUILDMEMBERADD_WELCOME_EMBED_FOOTER").replace(/{memberCount}/ig, member.guild.memberCount),
                      icon_url: client.user.displayAvatarURL({format: 'png'})
                    },
                };

                client.channels.cache.get(goodbyeChannel).send(({ embeds: [embed] }))
            }
        } else {
            client.channels.cache.get(goodbyeChannel).send(messageSend).catch(e => { return member.guild.owner.send(language("EVENTS_GUILDMEMBERREMOVE_GOODBYE_ERROR")) });
        }
    }

    return;
}