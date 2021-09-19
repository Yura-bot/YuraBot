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

        if (!message.member.permissions.has("KICK_MEMBERS")) {
            var error_permissions = new Discord.MessageEmbed()
                .setDescription(language("MISSING_PERMISSION_KICK_MEMBERS"))
                .setColor("#F43436")
            return message.channel.send(error_permissions)
        }

        let reason = args.slice(2).join(' ');

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

        if (userID === message.author.id) return message.channel.send(language("AUTOKICK"));
        if (userID === client.user.id) return message.channel.send(language("KICKYURA"));

        user = await client.users.fetch(userID)

        if (reason.length < 1) reason = language("BAN_NO_REASON");
        
        const embed = new Discord.MessageEmbed()
        .setColor(0xFF0000)
        .setTimestamp()
        .setThumbnail(user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
        .addField(language("MOD_ACTION"), 'Kick')
        .addField(language("MOD_MEMBER"), `${user} (${user.id})`)
        .addField(language("MOD_MODERATOR"), `${message.author.username}#${message.author.discriminator}`)
        .addField(language("MOD_REASON"), reason)
        .setFooter(client.footer);
        message.channel.send({ embeds: [embed] });

        message.guild.members.kick(user.id, reason).catch(e =>{
            message.channel.send(language("KICK_ERROR"))
            return client.emit('error',e, "kick");
        });
    
        if(user.bot) return;
        
        user.send(language("KICK_SUCESS").replace("${server}", message.guild.name).replace("${mod}", message.author.username).replace("${reason}", reason)).catch(e =>{
            message.channel.send(language("KICK_SUCESS_MPCLOSE"))
        });
    }
}

module.exports = new Kick;