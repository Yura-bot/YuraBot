module.exports = async(client, message, playlist) => {

    let db = await client.db.getGuild(message.guild.id)

    let prefix = !db.prefix ? config.prefix : db.prefix;
    let guildLanguage = !db.lang ? "english": db.lang;

    const language = require(`../languages/${guildLanguage}`);

    return message.channel.send({embed: {color: '0x00FF46', description: language("PLAY_ADD_QUEUE_1") + playlist.title + language("PLAY_ADD_QUEUE_2") + `(**${playlist.items.length}** ${language("SONGS")}) !` }})
};