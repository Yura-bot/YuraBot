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

    let goodbyeEnabled = client.guildSettings.has(`${member.guild.id}`, "goodbyePlug")

    if (goodbyeEnabled) {

        let goodbyeChannel = client.guildSettings.get(`${member.guild.id}`, "goodbyePlug.goodbyeChannel")
        let goodbyeMessage = client.guildSettings.get(`${member.guild.id}`, "goodbyePlug.goodbyeMessage")
        let goodbyeImage = client.guildSettings.get(`${member.guild.id}`, "goodbyePlug.goodbyeImage")

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

        client.channels.cache.get(goodbyeChannel).send(messageSend).catch(e => { return member.guild.owner.send(language("EVENTS_GUILDMEMBERREMOVE_GOODBYE_ERROR")) });
    }

    return;
}