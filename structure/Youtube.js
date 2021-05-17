module.exports.init = async function (client) {

    client.db.notif({ AllChannels: true }).then(AllChannels => {

        client.yNotifier.subscribe(AllChannels);
        console.log("• Youtube Notification initialisé !");
    });

    client.yNotifier.on('notified', async data => {

        let DBChannel = await client.db.notif({ find: data.channel.id });
        if (!DBChannel) return;

        let Data = DBChannel.data
        if (!Data[0]) return;

        Data.forEach(el => {

            if (!el.id || !el.msg) return;

            let msg = el.msg
            .replace("{id}", data.video.id)
            .replace("{title}", data.video.title)
            .replace("{link}", data.video.link)
            .replace("{channel-id}", data.channel.id)
            .replace("{channel-name}", data.channel.name)
            .replace("{channel-link}", data.channel.link)

            client.channels.cache.get(el.id).send(msg).catch(e => {});
        })

    });
 
    const CHN = [
        'UCq-Fj5jknLsUf-MWSy4_brA',
        'UCfznY5SlSoZoXN0-kBPtCdg',
        'UCY-_QmcW09PHAImgVnKxU2g',
        'UCJy0lX8ThZ7lCtst7JnegWQ',
        'UCWedHS9qKebauVIK2J7383g',
        'UCQsb5TqYUeGWGpJFr8DMWsQ',
        'UCGkDd8zxGWFXiPC73vc1oFQ',
        'UChPrh75CmPP9Ig6jISPnfNA',
        'UCWnfDPdZw6A23UtuBpYBbAg',
        'UCVRJ6D343dX-x730MRP8tNw',
        'UClAFgotVhZ1DGvN57EMY7fA',
        'UC_446tDNo7UckPX78hM0Nlg',
        'UCvuACILbubOXV_OMBWqLM2g',
        'UCO51V1HFKyTATSd9JaqURNg'
    ];

/*
[
    { id: guildId, msg: "+var" },
    { id: guildId, msg: "+var" },
    { id: guildId, msg: "+var" }
]
*/
};