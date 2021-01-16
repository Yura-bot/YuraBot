module.exports = async(client, member) => {

    let db = await client.db.getGuild(member.guild.id)

    let guildLanguage = !db.lang ? "english": db.lang;
    let language = require(`../languages/${guildLanguage}`);

    let goodbyeEnabled = db.goodbye.enabled

    if (goodbyeEnabled) {

        let goodbyeChannel = db.goodbye.channel
        let goodbyeMessage = db.goodbye.message

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