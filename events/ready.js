module.exports = async(client) => {
    console.log("» "+client.user.username+" est prêt, connécté en tant que "+client.user.tag+".");

    if (client.shard.ids.includes(0) && !client.spawned){
        await client.YoutubeNotif.init(client);
        await client.dash.load(client);
    }

    await client.db.init();

    let guildCount = await client.shard.fetchClientValues('guilds.cache.size')

    //Status
    let status = `yurabot.xyz | ?help | ${guildCount.reduce((acc, guildCount) => acc + guildCount, 0)} guilds !`
    client.user.setActivity(status, {type: "PLAYING"})
}