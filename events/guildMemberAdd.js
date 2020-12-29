module.exports = async(client, member) => {

    let guildSettingsExist = client.guildSettings.has(`${member.guild.id}`)
    if (guildSettingsExist === false) return;

    let prefix;
    let guildLanguage;

    if (guildSettingsExist) {
        prefix = client.guildSettings.get(`${member.guild.id}`, "prefix")
        guildLanguage = client.guildSettings.get(`${member.guild.id}`, "lang")
    } else {
        prefix = client.default_prefix;
        guildLanguage = "english"
    }

    const language = require(`../languages/${guildLanguage}`);

    let welcomeEnabled = client.guildSettings.has(`${member.guild.id}`, "welcomePlug")
    let welcomeMpEnabled = client.guildSettings.has(`${member.guild.id}`, "welcomeMpPlug")
    let autoroleEnabled = client.guildSettings.has(`${member.guild.id}`, "autorolePlug")

    if (welcomeEnabled) {

        let welcomeChannel = client.guildSettings.get(`${member.guild.id}`, "welcomePlug.welcomeChannel")
        let welcomeMessage = client.guildSettings.get(`${member.guild.id}`, "welcomePlug.welcomeMessage")

        let welcomeEmbed = client.guildSettings.has(`${member.guild.id}`, "welcomePlug.welcomeEmbed")
        if (welcomeEmbed) welcomeEmbed = client.guildSettings.get(`${member.guild.id}`, "welcomePlug.welcomeEmbed")

        let welcomeImage = client.guildSettings.has(`${member.guild.id}`, "welcomePlug.welcomeImage")

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

                let color = client.guildSettings.get(`${member.guild.id}`, "welcomePlug.welcomeImage.color")
                let colorTitle = client.guildSettings.get(`${member.guild.id}`, "welcomePlug.welcomeImage.colorTitle")

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
                .setBackground("https://image.noelshack.com/fichiers/2020/28/5/1594371011-welcome-image.png")
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
                      text: language("EVENTS_GUILDMEMBERADD_WELCOME_EMBED_FOOTER", member.guild.memberCount),
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
                      text: language("EVENTS_GUILDMEMBERADD_WELCOME_EMBED_FOOTER", member.guild.memberCount),
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
        let welcomeMessage = client.guildSettings.get(`${member.guild.id}`, "welcomeMpPlug.welcomeMessage")

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

        let autoroleRole = client.guildSettings.get(`${member.guild.id}`, "autorolePlug.role")

        if(member.guild.roles.cache.has(autoroleRole) === false){
            return member.guild.owner.send(language("EVENTS_GUILDMEMBERADD_AUTOROLE_ERROR")).catch(e => {});
        }
        member.roles.add(autoroleRole, "Autorole").catch(e =>{
            return member.guild.owner.send(language("EVENTS_GUILDMEMBERADD_AUTOROLE_ERROR")).catch(e => {});
        });
    }

    return;
}