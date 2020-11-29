const Command = require("../../structure/Command.js");

class Ban extends Command {
    constructor() {
        super({
            name: 'ban',
            aliases: [],
            category: 'mod',
            description: 'Ban le membre choisi avec ou sans raison.',
            usage: 'ban [Membre] (Raison)'
        });
    }

    async run(client, message, args) {

        const Discord = require("discord.js");

        let guildSettingsExist = client.guildSettings.has(`${message.guild.id}`)

        let prefix;
        let guildLanguage;

        if (guildSettingsExist) {
            prefix = client.guildSettings.get(`${message.guild.id}`, "prefix")
            guildLanguage = client.guildSettings.get(`${message.guild.id}`, "lang")
        } else {
            prefix = client.default_prefix;
            guildLanguage = "english"
        }

        const language = require(`../../languages/${guildLanguage}`);

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            var error_permissions = new Discord.MessageEmbed()
                .setDescription(language("MISSING_PERMISSION_BAN_MEMBERS"))
                .setColor("#F43436")
             message.channel.send(error_permissions)
        }

        let reason = args.slice(2).join(' ');
        let user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[1]);

        if (!user) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_BAN"))
        if (user.id === message.author.id) return message.channel.send(language("AUTOBAN"));
        if (user.id === client.user.id) return message.channel.send(language("BANYURA"));

        if (reason.length < 1) reason = language("BAN_NO_REASON");

        let botRolePossition = message.guild.member(client.user).roles.highest.position;
        let rolePosition = message.guild.member(user).roles.highest.position;
        let userRolePossition = message.member.roles.highest.position;

        if (userRolePossition <= rolePosition) return message.channel.send(language("BAN_ERROR_1"))
        if (botRolePossition <= rolePosition) return message.channel.send(language("BAN_ERROR_2"))
        
        if (!message.guild.member(user).bannable) {
            message.channel.send(language("BAN_ERROR_INTERNE"));
            return client.emit('error',e, "ban-Interne");
        } else {
          const embed = new Discord.MessageEmbed()
          .setColor(0xFF0000)
          .setTimestamp()
          .addField(language("MOD_ACTION"), 'Ban')
          .addField(language("MOD_MEMBER"), `${user} (${user.id})`)
          .addField(language("MOD_MODERATOR"), `${message.author.username}#${message.author.discriminator}`)
          .addField(language("MOD_REASON"), reason)
          .setFooter(client.footer);
          message.channel.send(embed);

          message.guild.members.ban(user.id, {days:7, reason: reason}).catch(e =>{
            message.channel.send(language("BAN_ERROR"))
            return client.emit('error',e, "ban");
          });
      
          if(user.bot) return;
          user.send(`${language("BAN_SUCESS_1")}${message.guild.name}${language("BAN_SUCESS_2")}${message.author.username}${language("BAN_SUCESS_3")}` + reason + "** !").catch(e =>{
           message.channel.send(language("BAN_SUCESS_MPCLOSE"))
          });
        }
    }
}

module.exports = new Ban;