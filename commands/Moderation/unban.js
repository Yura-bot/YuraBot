const Command = require("../../structure/Command.js");

class UnBan extends Command {
    constructor() {
        super({
            name: 'unban',
            aliases: [],
            category: 'mod',
            description: 'Unban le membre choisi avec ou sans raison.',
            usage: 'unban [Membre] (Raison)'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            var error_permissions = new Discord.MessageEmbed()
                .setDescription(language("MISSING_PERMISSION_BAN_MEMBERS"))
                .setColor("#F43436")
             return message.channel.send(error_permissions)
        }

        let user = args[1];
        if (!user) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_UNBAN"))

        let bannedMember = client.users.cache.get(user)

        if (!bannedMember) {
            return message.reply(language("UNBAN_INVALIDE_ID"));
        }

        let reason = args.slice(2).join(' ');
        if (reason.length < 1) reason = language("BAN_NO_REASON");
        
        let embed = new Discord.MessageEmbed()
        .setColor(0xFF0000)
        .setTimestamp()
        .addField(language("MOD_ACTION"), 'Unban')
        .addField(language("MOD_MEMBER"), `${bannedMember} (${bannedMember.id})`)
        .addField(language("MOD_MODERATOR"), `${message.author.username}#${message.author.discriminator}`)
        .addField(language("MOD_REASON"), reason)
        .setFooter(client.footer);

      message.guild.fetchBans().then(bans=> {
          
      let banneduser = bans.find(b => b.user.id == user)
      //if(banneduser.size == 0) return 
      if(!banneduser) return message.channel.send(language("UNBAN_NOBAN", bannedMember.username));

      message.guild.members.unban(bannedMember, reason).catch(e =>{});

      message.channel.send(embed).catch(e =>{});
  
      if(bannedMember.bot) return;
      bannedMember.send(`${language("UNBAN_SUCESS_1")}${message.guild.name}${language("UNBAN_SUCESS_2")}${message.author.username}${language("UNBAN_SUCESS_3")}` + reason + "** !").catch(e =>{
       message.channel.send(language("UNBAN_SUCESS_MPCLOSE"))
      })
      
      });
        
    }
}

module.exports = new UnBan;