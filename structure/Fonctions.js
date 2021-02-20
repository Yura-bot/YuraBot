module.exports = client => {
    client.getEmoji = (emojiId) => {
        client.emojis.cache.get(emojiId).toString();
        return null;
    }

    client.isURL = (str) => {
        let array = [ ".png", ".jpg" ]
        return array.some(list => str.includes(list))
    }

    client.fetchGuild = async(guildID) => {
        const results = await client.shard.broadcastEval(`
        let guild = this.guilds.cache.get('${guildID}');
        if(guild){
            if(guild.name) {
                let toReturn = guild.toJSON();
                toReturn.channels = guild.channels.cache.toJSON();
                toReturn.roles = guild.roles.cache.map((r) => {
                    return {
                        name: r.name,
                        hexColor: r.hexColor,
                        id: r.id
                    };
                });
                toReturn;
            }
        }
        `);
        const guild = results.find((g) => g);
        return { ...guild };
    }
};