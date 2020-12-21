module.exports = (client, message, track) => {

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

    return message.channel.send({embed: {color: '0x00FF46', description: language("PLAY_PLAYNOW") + track.title + language("PLAY_INTO") + `${message.member.voice.channel.name} ...` }})
};