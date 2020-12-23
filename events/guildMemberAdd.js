module.exports = (client, member) => {

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
        let welcomeImage = client.guildSettings.get(`${member.guild.id}`, "welcomePlug.welcomeImage")

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

        client.channels.cache.get(welcomeChannel).send(messageSend).catch(e => { member.guild.owner.send(language("EVENTS_GUILDMEMBERADD_WELCOME_ERROR")) });
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