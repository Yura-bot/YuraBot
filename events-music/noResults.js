module.exports = async(client, message, query) => {

    let db = await client.db.getGuild(message.guild.id)

    let prefix = !db.prefix ? config.prefix : db.prefix;
    let guildLanguage = !db.lang ? "english": db.lang;

    const language = require(`../languages/${guildLanguage}`);

    return message.channel.send({embed: {color: '0xFF0000', description: language("MUSIC_NO_RESULTS", query) }})
};