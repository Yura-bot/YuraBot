const Discord = require('discord.js');

module.exports = (client, guild) => {
    const joinembed = new Discord.MessageEmbed()
        .setDescription(`📌 Merci à **${guild.name}** d'avoir ajouté ${client.user.username}`)
        .setThumbnail(guild.iconURL())
        .addField("📋 __Nom du serveur__", guild.name)
        .addField("📊 __Nombre de membres__ :", guild.memberCount)
        .addField("💻 __Nombre de salons__ :", guild.channels.cache.size)
        .addField("👤 __Propriétaire__ :", guild.owner)
        .addField("🌍 __Région du serveur__ :", guild.region)
        .addField("💎 __Boosts du serveur__ :", guild.premiumSubscriptionCount)
        .setFooter(`Le bot est désormais sur ${client.guilds.cache.size} serveurs !`)
        .setColor("#08C300")
      client.channels.cache.get('665849169717624848').send(joinembed);

      let status = `yurabot.xyz | ?help | ${client.guilds.cache.size} guilds !`
      client.user.setActivity(status, {type: "PLAYING"})
};
