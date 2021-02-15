module.exports = async(client, error, message) => {

    let db = await client.db.getGuild(message.guild.id)

    let prefix = !db.prefix ? config.prefix : db.prefix;
    let guildLanguage = !db.lang ? "english": db.lang;

    const language = require(`../languages/${guildLanguage}`);

    switch (error) {
        case 'NotPlaying':
            message.channel.send({embed: {color: '0xFF0000', description: language("MUSIC_ERROR_1") }})
            break;
        case 'NotConnected':
            message.channel.send({embed: {color: '0xFF0000', description: language("MUSIC_ERROR_2") }})
            break;
        case 'UnableToJoin':
            message.channel.send({embed: {color: '0xFF0000', description: language("MUSIC_ERROR_3") }})
            break;
        default:
            message.channel.send({embed: {color: '0xFF0000', description: language("MUSIC_ERROR_4").replace("{error}", error) }})
            return client.emit('error', error, "Music Error 4");
    };

};
