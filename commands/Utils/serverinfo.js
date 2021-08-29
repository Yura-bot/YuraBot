const Command = require("../../structure/Command.js");

class ServerInfo extends Command {
    constructor() {
        super({
            name: 'serverinfo',
            aliases: ['si', 's-i'],
            category: 'utils',
            description: "Permet de voir les informations du serveur.",
            usage: 'userinfo'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);
        
        var emojis;
        if (message.guild.emojis.cache.size === 0) {
            emojis = language("SERVERINFO_NO_ROLES");
        } else {
            emojis = message.guild.emojis.cache.size.toString();
        }

        let owner = await client.users.fetch(message.guild.ownerId)
        
        const embed = new Discord.MessageEmbed()
        .setURL(client.url)
        .setAuthor(message.guild.name, message.guild.iconURL() ? message.guild.iconURL() : client.user.displayAvatarURL())
        .setThumbnail(message.guild.iconURL())
        .setTimestamp()
        .addField(language("SERVERINFO_NAME"), message.guild.name)
        .addField(language("SERVERINFO_CREATION"), `${message.guild.createdAt.toString().substr(0, 15)},\n(${checkDays(message.guild.createdAt)})`)
        .addField(language("SERVERINFO_ID"), message.guild.id)
        .addField(language("SERVERINFO_PROPRIETAIRE"), owner.tag)
        //.addField(language("SERVERINFO_REGION"), [message.guild.region])
        .addField(language("SERVERINFO_USERS"), message.guild.memberCount.toString())
        //.addField(language("SERVERINFO_STATS"), language("SERVERINFO_STATS_ONLINE")+on+language("SERVERINFO_STATS_STREAM")+streamer+language("SERVERINFO_STATS_AFK")+afk+language("SERVERINFO_STATS_DND")+dnd+language("SERVERINFO_STATS_OFFLINE")+offline)  INTENT PRESENCE !!!!!!!!
        //.addField(language("SERVERINFO_BOT"), message.guild.members.cache.filter(m => m.user.bot).size)
        .addField(language("SERVERINFO_AFK"), message.guild.afkTimeout.toString() / 60 + ' minutes')
        .addField(language("SERVERINFO_ROLES"), message.guild.roles.cache.size.toString())
        .addField(language("SERVERINFO_CHANNELS"), message.guild.channels.cache.size.toString())
        .addField(language("SERVERINFO_EMOJIS"), `${emojis}/100`)
        .addField(language("SERVERINFO_VERIFICATION"), message.guild.verificationLevel)
        .setColor(client.color)
        .setFooter(client.footer, client.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }));

        message.channel.send({embeds: [embed]});

        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " days") + " ago";
        };
    }
}

module.exports = new ServerInfo;