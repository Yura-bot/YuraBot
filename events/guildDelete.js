const Discord = require('discord.js');

module.exports = async(client, guild) => {

    await req.bot.shard.broadcastEval(`
    const Discord = require('discord.js');

    const leaveembed = new Discord.MessageEmbed()
    .setDescription("📌 Le serveur **${guild.name}** vient de retirer ${client.user.username}")
    .setThumbnail(guild.iconURL())
    .addField("📋 __Nom du serveur__", ${guild.name})
    .addField("📊 __Nombre de membres__ :", ${guild.memberCount})
    .addField("👤 __Propriétaire__ :", ${guild.owner.user.tag})
    .addField("🌍 __Région du serveur__ :", ${guild.region})
    .setFooter("Le bot est désormais sur ${client.guilds.cache.size} serveurs !")
    .setColor("#08C300")

    this.channels.cache.get('665849169717624848').send(leaveembed);
    `);

    await client.db.deleteGuild(guild.id)

    let status = `yurabot.xyz | ?help | ${client.guilds.cache.size} guilds !`
    client.user.setActivity(status, {type: "PLAYING"})
};
