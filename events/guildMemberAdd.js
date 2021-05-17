module.exports = async(client, member) => {

    let db = await client.db.getGuild(member.guild.id)

    let guildLanguage = !db.lang ? "english": db.lang;
    let language = require(`../languages/${guildLanguage}`);

    let welcomeEnabled = db.welcome.enabled
    let welcomeMpEnabled = db.welcomeMp
    let autoroleEnabled = db.autorole.enabled

    let UserBanCheck = false

    if (UserBanCheck) {
        let userban = await client.getUserBan(member.id)

        if (userban) {
            member.send("Vous avez été bannis du serveur automatiquement car vous appartenez à la blacklist du bot ! \n Veuillez vous renseignez ici : https://discord.gg/etQ3uJN")
            member.ban({ days: 7, reason: 'This member was found in our blacklist.' });
        }
    }

    if (welcomeEnabled) {

        let welcomeChannel = db.welcome.channel
        let welcomeMessage = db.welcome.message

        let welcomeEmbed = db.welcome.withEmbed
        let welcomeImage = db.welcome.withImage

        if(client.channels.cache.has(welcomeChannel) === false){
            return member.guild.owner.send(language("EVENTS_GUILDMEMBERADD_WELCOME_ERROR")).catch(e => {});
        }

        let messageSend = welcomeMessage
        .replace('{member}', member)
        .replace('{user}', member.user.username)
        .replace('{tag}', member.user.tag)
        .replace('{memberid}', member.user.id)
        .replace('{server}', member.guild.name)
        .replace('{membercount}', member.guild.memberCount)

        if (welcomeEmbed) {
            if (welcomeImage) {
                const Canvas = require("discord-canvas"),
                Discord = require("discord.js"),
                Clean = require('js-string-cleaner');

                let color = db.welcome.config.colorBackground
                let colorTitle = db.welcome.config.colorTitle

                let imageURL = db.welcome.config.img

                if (imageURL != null && client.isURL(imageURL)) {
                    imageURL = db.welcome.config.img
                } else imageURL = "https://image.noelshack.com/fichiers/2020/28/5/1594371011-welcome-image.png"

                const image = await new Canvas.Welcome()
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
                .setText("title", language("WELCOME"))
                .setText("message", language("WELCOME_ON"))
                .setText("member-count", language("MEMBER_COUNT"))
                .toAttachment();
            
                const attachment = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png")

                const embed = {
                    color: colorTitle,
                    title: messageSend,
                    image: {
                        url: 'attachment://welcome-image.png',
                    },
                    timestamp: new Date(),
                    footer: {
                      text: language("EVENTS_GUILDMEMBERADD_WELCOME_EMBED_FOOTER").replace(/{memberCount}/ig, member.guild.memberCount),
                      icon_url: client.user.displayAvatarURL({format: 'png'})
                    },
                };

                client.channels.cache.get(welcomeChannel).send(({ files: [attachment], embed: embed })).catch(e => {});
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

                client.channels.cache.get(welcomeChannel).send(({ embed: embed }))
            }
        } else {
            client.channels.cache.get(welcomeChannel).send(messageSend).catch(e => { member.guild.owner.send(language("EVENTS_GUILDMEMBERADD_WELCOME_ERROR")) });
        }
    }

    if (welcomeMpEnabled) {
        let welcomeMessage = db.welcomeMp

        let messageSend = welcomeMessage
        .replace('{member}', member)
        .replace('{user}', member.user.username)
        .replace('{tag}', member.user.tag)
        .replace('{memberid}', member.user.id)
        .replace('{server}', member.guild.name)
        .replace('{membercount}', member.guild.memberCount)

        member.send(messageSend).catch(e => {});
    }

    if (autoroleEnabled) {

        let autoroleRole = db.autorole.role

        if(member.guild.roles.cache.has(autoroleRole) === false){
            return member.guild.owner.send(language("EVENTS_GUILDMEMBERADD_AUTOROLE_ERROR")).catch(e => {});
        }
        member.roles.add(autoroleRole, "Autorole").catch(e =>{
            return member.guild.owner.send(language("EVENTS_GUILDMEMBERADD_AUTOROLE_ERROR")).catch(e => {});
        });
    }

    return;
}