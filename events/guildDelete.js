const Discord = require('discord.js');

module.exports = async(client, guild) => {

    let guildCount = await client.shard.fetchClientValues('guilds.cache.size')

    await client.shard.broadcastEval(`
    const Discord = require('discord.js');

    const leaveembed = new Discord.MessageEmbed()
    .setDescription("📌 Le serveur **${guild.name}** vient de retirer ${client.user.username}")
    .setThumbnail("${guild.iconURL()}")
    .addField("📋 __Nom du serveur__", "${guild.name}")
    .addField("📊 __Nombre de membres__ :", "${guild.memberCount}")
    .addField("👤 __Propriétaire__ :", "${guild.owner}")
    .addField("🌍 __Région du serveur__ :", "${guild.region}")
    .setFooter("Le bot est désormais sur ${guildCount} serveurs !")
    .setColor("RED")

    this.channels.cache.get('665849169717624848').send(leaveembed);
    `);

    await client.db.deleteGuild(guild.id)
    await client.db.deleteReactionRoles(false, guild.id)

    let status = `yurabot.xyz | ?help | ${guildCount} guilds !`
    client.user.setActivity(status, {type: "PLAYING"})
};
