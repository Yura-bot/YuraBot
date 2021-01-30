const Command = require("../../structure/Command.js");

class Kick extends Command {
    constructor() {
        super({
            name: 'kick',
            aliases: [],
            category: 'mod',
            description: 'Kick le membre choisi avec ou sans raison.',
            usage: 'kick [Membre] (Raison)'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if (!message.member.hasPermission("KICK_MEMBERS")) {
            var error_permissions = new Discord.MessageEmbed()
                .setDescription(language("MISSING_PERMISSION_KICK_MEMBERS"))
                .setColor("#F43436")
            return message.channel.send(error_permissions)
        }

        let reason = args.slice(2).join(' ');
        let user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[1]);

        if (!user) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_KICK"))
        if (user.id === message.author.id) return message.channel.send(language("AUTOKICK"));
        if (user.id === client.user.id) return message.channel.send(language("KICKYURA"));

        if (reason.length < 1) reason = language("BAN_NO_REASON");

        let botRolePossition = message.guild.member(client.user).roles.highest.position;
        let rolePosition = message.guild.member(user).roles.highest.position;
        let userRolePossition = message.member.roles.highest.position;

        if (userRolePossition <= rolePosition) return message.channel.send(language("KICK_ERROR_1"))
        if (botRolePossition <= rolePosition) return message.channel.send(language("KICK_ERROR_2"))
        
        if (!message.guild.member(user).bannable) {
            message.channel.send(language("KICK_ERROR_INTERNE"));
        } else {
          const embed = new Discord.MessageEmbed()
          .setColor(0xFF0000)
          .setTimestamp()
          .addField(language("MOD_ACTION"), 'Kick')
          .addField(language("MOD_MEMBER"), `${user} (${user.id})`)
          .addField(language("MOD_MODERATOR"), `${message.author.username}#${message.author.discriminator}`)
          .addField(language("MOD_REASON"), reason)
          .setFooter(client.footer);
          message.channel.send(embed);

          user.kick(reason).catch(e =>{
            message.channel.send(language("KICK_ERROR"))
            return client.emit('error',e, "kick");
          });
      
          if(user.bot) return;
          user.send(`${language("KICK_SUCESS_1")}${message.guild.name}${language("KICK_SUCESS_2")}${message.author.username}${language("KICK_SUCESS_3")}` + reason + "** !").catch(e =>{
           message.channel.send(language("KICK_SUCESS_MPCLOSE"))
          });
        }
    }
}

module.exports = new Kick;