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

        const banned = await message.guild.fetchBans();
		if(!banned.some((e) => e.bannedMember.id === bannedMember.id)){
			return message.channel.send(language("UNBAN_NOBAN", bannedMember.username));
        }
        
        message.guild.members.unban(bannedMember, reason)
        .catch(e =>{
          message.channel.send(language("UNBAN_NOBAN", bannedMember.username))
        });

        message.channel.send(embed);
    
        if(bannedMember.bot) return;
        bannedMember.send(`${language("UNBAN_SUCESS_1")}${message.guild.name}${language("UNBAN_SUCESS_2")}${message.author.username}${language("UNBAN_SUCESS_3")}` + reason + "** !").catch(e =>{
         message.channel.send(language("UNBAN_SUCESS_MPCLOSE"))
        });
        
    }
}

module.exports = new UnBan;