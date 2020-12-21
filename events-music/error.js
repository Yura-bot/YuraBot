module.exports = (client, error, message) => {

    let guildSettingsExist = client.guildSettings.has(`${message.guild.id}`)

    let prefix;
    let guildLanguage;

    if (guildSettingsExist) {
        prefix = client.guildSettings.get(`${message.guild.id}`, "prefix")
        guildLanguage = client.guildSettings.get(`${message.guild.id}`, "lang")
    } else {
        prefix = client.default_prefix;
        guildLanguage = "english"
    }

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
            message.channel.send({embed: {color: '0xFF0000', description: language("MUSIC_ERROR_4", error) }})
            return client.emit('error',error, "Music Error 4");
    };

};
