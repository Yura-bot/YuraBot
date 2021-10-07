const Discord = require('discord.js');

module.exports = async(client, guild) => {

    let guildCount = await client.shard.fetchClientValues('guilds.cache.size')

    let owner = await client.users.fetch(guild.ownerID)
    owner = owner.tag

    const leaveembed = new Discord.MessageEmbed()
    .setDescription(`📌 Le serveur **${guild.name}** vient de retirer ${client.user.username}`)
    .setThumbnail(guild.iconURL())
    .addField("📋 __Nom du serveur__", guild.name)
    .addField("📊 __Nombre de membres__ :", guild.memberCount)
    .addField("👤 __Propriétaire__ :", owner)
    .addField("🌍 __Région du serveur__ :", guild.region)
    .addField("💎 __Boosts du serveur__ :", guild.premiumSubscriptionCount)
    .setFooter(`Le bot est désormais sur ${guildCount} serveurs !`)
    .setColor("RED");

    if (guild.banner) leaveembed.setImage(guild.banner)

    client.channels.cache.get('665849169717624848').send({embeds: [leaveembed]});

    await client.db.deleteGuild(guild.id)
    await client.db.deleteReactionRoles(false, guild.id)

    let status = `yurabot.xyz | ?help | ${guildCount} guilds !`
    client.user.setActivity(status, {type: "PLAYING"})
};
