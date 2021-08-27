module.exports = async(client, i) => {
    let db = await client.db.getGuild(i.guildId)

    let prefix = !db.prefix ? config.prefix : db.prefix;
    let guildLanguage = !db.lang ? "english": db.lang;
    let language = require(`../languages/${guildLanguage}`);

    if (i.isButton()) {}

    if (i.isSelectMenu()) {
        db.lang = i.values[0];
        await db.save();

        if(i.values[0] === "french") i.reply(language("CONFIG_LANG_FR"))
        else i.reply(language("CONFIG_LANG_EN"))

        return;
    }
}