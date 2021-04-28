const Command = require("../../structure/Command.js");

class TempBan extends Command {
    constructor() {
        super({
            name: 'tempban',
            aliases: [],
            category: 'mod',
            description: 'Ban temporairement le membre choisi avec ou sans raison.',
            usage: 'tempban [Membre] [Temps] (Raison)'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");
        const ms = require("ms");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            var error_permissions = new Discord.MessageEmbed()
                .setDescription(language("MISSING_PERMISSION_BAN_MEMBERS"))
                .setColor("#F43436")
             return message.channel.send(error_permissions)
        }

        let reason = args.slice(3).join(' ');
        let user = message.guild.member(message.mentions.users.first()) || await message.guild.members.fetch(args[1]);

        if (!user) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_TEMPBAN"))
        if (user.id === message.author.id) return message.channel.send(language("AUTOBAN"));
        if (user.id === client.user.id) return message.channel.send(language("BANYURA"));

        let bantime = args[2];
        if(!bantime) return message.reply(language("SYNTAXE") + prefix + language("SYNTAXE_TEMPBAN"));

        if (reason.length < 1) reason = language("BAN_NO_REASON");

        let botRolePossition = message.guild.member(client.user).roles.highest.position;
        let rolePosition = message.guild.member(user).roles.highest.position;
        let userRolePossition = message.member.roles.highest.position;

        if (userRolePossition <= rolePosition) return message.channel.send(language("BAN_ERROR_1"))
        if (botRolePossition <= rolePosition) return message.channel.send(language("BAN_ERROR_2"))
        
        if (!message.guild.member(user).bannable) {
            message.channel.send(language("BAN_ERROR_INTERNE"));
        } else {
          const embed = new Discord.MessageEmbed()
          .setColor(0xFF0000)
          .setTimestamp()
          .addField(language("MOD_ACTION"), 'TempBan')
          .addField(language("MOD_MEMBER"), `${user} (${user.id})`)
          .addField(language("MOD_MODERATOR"), `${message.author.username}#${message.author.discriminator}`)
          .addField(language("MOD_REASON"), reason)
          .addField(language("MOD_TIME"), ms(ms(bantime)))
          .setFooter(client.footer);
          message.channel.send(embed);

          message.guild.members.ban(user.id, {days:7, reason: reason}).catch(e =>{
            message.channel.send(language("BAN_ERROR"))
            return client.emit('error',e, "tempban");
          });
      
          if(user.bot) return;

          user.send(language("TEMPBAN_SUCESS").replace("${guild}", message.guild.name).replace("${user}", message.author.username).replace("${reason}", reason).replace("${time}", ms(ms(bantime)))).catch(e =>{
           message.channel.send(language("BAN_SUCESS_MPCLOSE"))
          });

          setTimeout(function(){

            message.guild.fetchBans().then(bans=> {
          
                let banneduser = bans.find(b => b.user.id == user.id)
                if(banneduser.size == 0) return ;
                if(!banneduser) return;
          
                message.guild.members.unban(user, "Auto Unban").catch(e =>{});
            
                if(user.bot) return;
                user.send(`${language("UNBAN_SUCESS_1")}${message.guild.name}${language("UNBAN_SUCESS_2")}${message.author.username}__ !`).catch(e => {
                 message.channel.send(language("UNBAN_SUCESS_MPCLOSE"))
                });
                
            });
        
        }, ms(bantime));
        }
    }
}

module.exports = new TempBan;