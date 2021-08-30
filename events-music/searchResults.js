// EVENT OFF

module.exports = async(client, query, tracks) => {

    let db = await client.db.getGuild(queue.guild.id)

    let prefix = !db.prefix ? config.prefix : db.prefix;
    let guildLanguage = !db.lang ? "english": db.lang;

    const language = require(`../languages/${guildLanguage}`);

    return queue.metadata.send({
        embeds: [{
            color: client.color,
            author: { name: language("PLAY_SEARCH_RESULTS").replace("{query}", query) },
            footer: { text: client.footer },
            timestamp: new Date(),
            description: `${tracks.map((t, i) => `**${i + 1}** - ${t.title}`).join('\n')}`,
        }],
    });

};