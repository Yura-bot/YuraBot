module.exports = async(client, reaction, user) => {
    if(user.bot) return;
    const Discord = require("discord.js");

    let db = await client.db.getGuild(reaction.message.guild.id)

    let guildLanguage = !db.lang ? "english": db.lang;
    let language = require(`../languages/${guildLanguage}`);

    let reactionRolesDB = await client.db.getReactionRoles(reaction.message.id, false)
    if (reactionRolesDB) removeRole(reaction.message, reaction.emoji, user, reactionRolesDB, language)
}

async function removeRole(message, emoji, user, db, language) {
    if (user.bot || message.id !== db.messageId) return;

    if (message.partial) {
      try {
        await message.fetch();
      } catch (err) {
        return member.send(language("RR_ROLE_ERROR_FETCH_MSG")).catch(e => {});
      }
    }
  
    let member = message.guild.members.cache.get(user.id);
    let role = message.guild.roles.cache.get(db.data[emoji.name]);

    let emojiID = emoji.id
    if (emojiID) role = message.guild.roles.cache.get(db.data[emoji.id]);

    if (!role) return member.send(language("RR_ROLE_NO_FOUND")).catch(e => {});
  
    try{
      member.roles.remove(role.id);
    } catch (err) {
        return member.send(language("RR_ROLE_MEMBER_ADMIN")).catch(e => {});
    }
}