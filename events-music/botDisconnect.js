module.exports = async(client, queue) => {

    let db = await client.db.getGuild(queue.guild.id)

    let prefix = !db.prefix ? config.prefix : db.prefix;
    let guildLanguage = !db.lang ? "english": db.lang;

    const language = require(`../languages/${guildLanguage}`);

    return queue.metadata.send({embeds: [{color: '0xFF0000', description: language("MUSIC_DISCONECTED") }]})
};
