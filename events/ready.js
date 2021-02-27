const axios = require("axios")

module.exports = async(client) => {
    console.log("» "+client.user.username+" est prêt, connécté en tant que "+client.user.tag+".");

    await client.db.init();

    let guildCount = await client.shard.fetchClientValues('guilds.cache.size')

    //Status
    let status = `yurabot.xyz | ?help | ${guildCount.reduce((acc, guildCount) => acc + guildCount, 0)} guilds !`
    client.user.setActivity(status, {type: "PLAYING"})

    if (client.shard.ids.includes(0) && !client.spawned){
        await client.dash.load(client);

        setInterval(maFonction, 43200000, client);

        function maFonction(client) {
            let StatusPageAPIKey = "8873bae76c9207298069da0fd47f9af7"

            let data = {
                "timestamp": Math.round(new Date().getTime() / 1000),
                "value": client.ws.ping
            }
    
            axios.post('https://api.instatus.com/v1/ckik44c7230ah0744mfbec2hb/metrics/ckjfr2xac0hqj0775pdd3xcno', data, {
                headers: {
                    'Authorization': `Bearer ${StatusPageAPIKey}`,
                }
            });
        }
    }
}