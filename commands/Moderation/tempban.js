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

        if (!message.member.permissions.has("BAN_MEMBERS")) {
            var error_permissions = new Discord.MessageEmbed()
                .setDescription(language("MISSING_PERMISSION_BAN_MEMBERS"))
                .setColor("#F43436")
             return message.channel.send(error_permissions)
        }

        let reason = args.slice(3).join(' ');

        let user = message.mentions.users.first();
        let userID = null

        if(!user) {
            if(args[1]) {
                user = await message.guild.members.fetch(args[1])
                .then(member => { userID = member.id })
                .catch(e => {return})
                if(!userID) userID = args[1]
            } else return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_BAN"))
        } else userID = user.id
        
        if (userID === message.author.id) return message.channel.send(language("AUTOBAN"));
        if (userID === client.user.id) return message.channel.send(language("BANYURA"));

        user = await client.users.fetch(userID)

        let bantime = args[2];
        if(!bantime) return message.reply(language("SYNTAXE") + prefix + language("SYNTAXE_TEMPBAN"));

        if (reason.length < 1) reason = language("BAN_NO_REASON");
        
        const embed = new Discord.MessageEmbed()
        .setColor(0xFF0000)
        .setTimestamp()
        .addField(language("MOD_ACTION"), 'TempBan')
        .addField(language("MOD_MEMBER"), `${user} (${user.id})`)
        .addField(language("MOD_MODERATOR"), `${message.author.username}#${message.author.discriminator}`)
        .addField(language("MOD_REASON"), reason)
        .addField(language("MOD_TIME"), ms(ms(bantime)))
        .setFooter(client.footer);
        message.channel.send({ embeds: [embed] });

        message.guild.members.ban(user.id, {days:7, reason: reason}).catch(e =>{
            message.channel.send(language("BAN_ERROR"))
            return client.emit('error',e, "tempban");
        });
    
        if(user.bot) return;
        user.send(language("TEMPBAN_SUCESS").replace("${guild}", message.guild.name).replace("${user}", message.author.username).replace("${reason}", reason).replace("${time}", ms(ms(bantime)))).catch(e =>{
            message.channel.send(language("BAN_SUCESS_MPCLOSE"))
        });

        setTimeout(async function(){

            const BanMember = await message.guild.bans.fetch(user.id).catch(e => {})
            if(!BanMember) return

            message.guild.members.unban(user.id, "Auto Unban").catch(e =>{});

            if(user.bot) return;
            user.send(language("UNBAN_SUCESS").replace("${server}", message.guild.name).replace("${mod}", message.author.username).replace("${reason}", reason)).catch(e => {});
    
        }, ms(bantime));
    }
}

module.exports = new TempBan;