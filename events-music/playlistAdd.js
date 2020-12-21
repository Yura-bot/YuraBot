module.exports = (client, message, playlist) => {

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

    return message.channel.send({embed: {color: '0x00FF46', description: language("PLAY_ADD_QUEUE_1") + playlist.title + language("PLAY_ADD_QUEUE_2") + `(**${playlist.items.length}** ${language("SONGS")}) !` }})
};