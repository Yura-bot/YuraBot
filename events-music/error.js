module.exports = async(client, queue, error) => {

    let db = await client.db.getGuild(queue.guild.id)

    let prefix = !db.prefix ? config.prefix : db.prefix;
    let guildLanguage = !db.lang ? "english": db.lang;

    const language = require(`../languages/${guildLanguage}`);

    switch (error) {
        case 'NotPlaying':
            queue.metadata.send({embeds: [{color: '0xFF0000', description: language("MUSIC_ERROR_1") }]})
            break;
        case 'NotConnected':
            queue.metadata.send({embeds: [{color: '0xFF0000', description: language("MUSIC_ERROR_2") }]})
            break;
        case 'UnableToJoin':
            queue.metadata.send({embeds: [{color: '0xFF0000', description: language("MUSIC_ERROR_3") }]})
            break;
        case 'ParseError':
                queue.metadata.send({embeds: [{color: '0xFF0000', description: language("MUSIC_ERROR_4") }]})
            break;
        case 'LiveVideo':
            queue.metadata.send({embeds: [{color: '0xFF0000', description: language("MUSIC_ERROR_5") }]})
            break;
        case 'VideoUnavailable':
            queue.metadata.send({embeds: [{color: '0xFF0000', description: language("MUSIC_ERROR_6") }]})
            break;
        default:
            queue.metadata.send({embeds: [{color: '0xFF0000', description: language("MUSIC_ERROR_0").replace("{error}", error) }]})
            return client.emit('error', error, "Music Error 4");
    };

};
