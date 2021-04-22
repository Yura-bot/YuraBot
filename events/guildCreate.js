const Discord = require('discord.js');

module.exports = async(client, guild) => {

      console.log(guild.iconURL())

      let guildCount = await client.shard.fetchClientValues('guilds.cache.size')

      let owner = await client.users.fetch(guild.ownerID)
      owner = owner.tag

      const joinembed = new Discord.MessageEmbed()
      .setDescription(`📌 Merci à **${guild.name}** d'avoir ajouté ${client.user.username}`)
      .setThumbnail(guild.iconURL())
      .addField("📋 __Nom du serveur__", guild.name)
      .addField("📊 __Nombre de membres__ :", guild.memberCount)
      .addField("💻 __Nombre de salons__ :", guild.channels.cache.size)
      .addField("👤 __Propriétaire__ :", owner)
      .addField("🌍 __Région du serveur__ :", guild.region)
      .addField("💎 __Boosts du serveur__ :", guild.premiumSubscriptionCount)
      .setFooter(`Le bot est désormais sur ${guildCount} serveurs !`)
      .setColor("#08C300");

      if (guild.banner) joinembed.setImage(guild.banner)

      client.channels.cache.get('665849169717624848').send(joinembed);

      let db = await client.db.getGuild(guild.id)

      let status = `yurabot.xyz | ?help | ${guildCount} guilds !`
      client.user.setActivity(status, {type: "PLAYING"})
};
