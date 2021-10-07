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

        if (!message.member.permissions.has("BAN_MEMBERS")) {
            var error_permissions = new Discord.MessageEmbed()
                .setDescription(language("MISSING_PERMISSION_BAN_MEMBERS"))
                .setColor("#F43436")
             return message.channel.send(error_permissions)
        }

        let user = args[1];
        if (!user) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_UNBAN"))

        let bannedMember = await client.users.fetch(user)

        if (!bannedMember) {
            return message.reply(language("UNBAN_INVALIDE_ID"));
        }

        let reason = args.slice(2).join(' ');
        if (reason.length < 1) reason = language("BAN_NO_REASON");
        
        let embed = new Discord.MessageEmbed()
        .setColor(0xFF0000)
        .setTimestamp()
        .setThumbnail(bannedMember.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
        .addField(language("MOD_ACTION"), 'Unban')
        .addField(language("MOD_MEMBER"), `${bannedMember} (${bannedMember.id})`)
        .addField(language("MOD_MODERATOR"), `${message.author.username}#${message.author.discriminator}`)
        .addField(language("MOD_REASON"), reason)
        .setFooter(client.footer);

        const BanMember = await message.guild.bans.fetch(bannedMember.id).catch(e => {})

        if(!BanMember) return message.channel.send(language("UNBAN_NOBAN").replace("{name}", bannedMember.username) );

        message.guild.members.unban(bannedMember.id, reason).catch(e =>{});

        message.channel.send({ embeds: [embed] }).catch(e =>{});

        if(bannedMember.bot) return;

        bannedMember.send(language("UNBAN_SUCESS").replace("${server}", message.guild.name).replace("${mod}", message.author.username).replace("${reason}", reason)).catch(e =>{
          message.channel.send(language("UNBAN_SUCESS_MPCLOSE"))
        })
        
    }
}

module.exports = new UnBan;