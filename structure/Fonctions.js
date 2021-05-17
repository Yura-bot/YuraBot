const axios = require("axios")

module.exports = client => {
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

    client.getUserBan = async (memberID) => {
        let userban = await axios.get(`https://api.ksoft.si/bans/check?user=${memberID}`, {
          headers: {
            'Authorization': `Bearer ae39d31ffa2df204b62c1e84a2e6c81e30d03d8d` 
          }
        })
        
        return userban.data.is_banned
    }
};