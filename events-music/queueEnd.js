module.exports = async(client, message, queue) => {

    let db = await client.db.getGuild(message.guild.id)

    let prefix = !db.prefix ? config.prefix : db.prefix;
    let guildLanguage = !db.lang ? "english": db.lang;

    const language = require(`../languages/${guildLanguage}`);

    return message.channel.send({embed: {color: '0xFFD100', description: language("PLAY_QUEUE_END") }})
};