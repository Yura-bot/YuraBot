module.exports = async(client, message, queue, track) => {

    let db = await client.db.getGuild(message.guild.id)

    let prefix = !db.prefix ? config.prefix : db.prefix;
    let guildLanguage = !db.lang ? "english": db.lang;

    const language = require(`../languages/${guildLanguage}`);

    return message.channel.send({embed: {color: '0x00FF46', description: language("MUSIC_TRACK_ADD").replace("{title}", track.title) }})
};