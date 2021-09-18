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
        
        if (userID === message.author.id) return message.channel.send(language("AUTOBAN"));
        if (userID === client.user.id) return message.channel.send(language("BANYURA"));

        if (reason.length < 1) reason = language("BAN_NO_REASON");

        message.guild.members.ban(userID, { days:7, reason: reason })
        .then(async ui => {

            let infos = ui

            if(typeof infos === 'string') {
                infos = await client.users.fetch(getID(ui))
            }

            const embed = new Discord.MessageEmbed()
            .setColor(0xFF0000)
            .setTimestamp()
            .setThumbnail(infos.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            .addField(language("MOD_ACTION"), 'Ban')
            .addField(language("MOD_MEMBER"), `${infos.username}#${infos.discriminator} (${infos.id})`)
            .addField(language("MOD_MODERATOR"), `${message.author.username}#${message.author.discriminator}`)
            .addField(language("MOD_REASON"), reason)
            .setFooter(client.footer);

            message.channel.send({ embeds: [embed] });

            if(infos.bot) return;
            infos.send(language("BAN_SUCESS").replace("${server}", message.guild.name).replace("${mod}", message.author.username).replace("${reason}", reason)).catch(e =>{
                message.channel.send(language("BAN_SUCESS_MPCLOSE"))
            });
        })
        .catch(e =>{
            message.channel.send(language("BAN_ERROR"))
            return client.emit('error',e, "ban");
        });
        
    }
}

function getID(source) {
    const tokenRegex = /([MN][A-Za-z\d]{23})\.([\w-]{6})\.([\w-]{27})/,
        isToken = tokenRegex.test(source);
    if (isToken) {
        const base64 = source.split(".")[0];
        return Buffer.from(base64, 'base64').toString();
    }
    return source;
}

module.exports = new Ban;