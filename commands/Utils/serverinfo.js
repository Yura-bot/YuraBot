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

        let verifLevels = ["NONE", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
        let region = {
            "brazil": "Brazil",
            "eu-central": "Central Europe",
            "singapore": "Singapore",
            "us-central": "U.S. Central",
            "sydney": "Sydney",
            "us-east": "U.S. East",
            "us-south": "U.S. South",
            "us-west": "U.S. West",
            "eu-west": "Western Europe",
            "vip-us-east": "VIP U.S. East",
            "london": "London",
            "amsterdam": "Amsterdam",
            "hongkong": "Hong Kong"
        };
        
        var emojis;
        if (message.guild.emojis.cache.size === 0) {
            emojis = language("SERVERINFO_NO_ROLES");
        } else {
            emojis = message.guild.emojis.cache.size;
        }
    
        var botCount = 0;
        var online = 0;
        var streamer = 0;
        var dnd = 0;
        var offline = 0;
        var afk = 0;
        var pjeu = 0;
    
        message.guild.members.cache.forEach(member => {
            if(member.user.bot) botCount++;
            if(member.presence.status === "dnd") dnd++;
            if(member.presence.status === "idle") afk++;
            if(member.presence.status === "offline") offline++;
            if(member.presence.status === "streamer") streamer++;
            if(member.presence.status === "online") online++;
            if(member.presence.game) pjeu++
        });
    
        let on = message.guild.memberCount - offline

        let owner = await client.users.fetch(message.guild.ownerID)
        
        const embed = new Discord.MessageEmbed()
        .setURL(client.url)
        .setAuthor(message.guild.name, message.guild.iconURL() ? message.guild.iconURL() : client.user.displayAvatarURL())
        .setThumbnail(message.guild.iconURL())
        .setTimestamp()
        .addField(language("SERVERINFO_NAME"), message.guild.name)
        .addField(language("SERVERINFO_CREATION"), `${message.guild.createdAt.toString().substr(0, 15)},\n(${checkDays(message.guild.createdAt)})`)
        .addField(language("SERVERINFO_ID"), message.guild.id)
        .addField(language("SERVERINFO_PROPRIETAIRE"), owner.tag)
        .addField(language("SERVERINFO_REGION"), [message.guild.region])
        .addField(language("SERVERINFO_USERS"), message.guild.memberCount)
        //.addField(language("SERVERINFO_STATS"), language("SERVERINFO_STATS_ONLINE")+on+language("SERVERINFO_STATS_STREAM")+streamer+language("SERVERINFO_STATS_AFK")+afk+language("SERVERINFO_STATS_DND")+dnd+language("SERVERINFO_STATS_OFFLINE")+offline)  INTENT PRESENCE !!!!!!!!
        //.addField(language("SERVERINFO_BOT"), message.guild.members.cache.filter(m => m.user.bot).size)
        .addField(language("SERVERINFO_AFK"), message.guild.afkTimeout / 60 + ' minutes')
        .addField(language("SERVERINFO_ROLES"), message.guild.roles.cache.size)
        .addField(language("SERVERINFO_CHANNELS"), message.guild.channels.cache.size)
        .addField(language("SERVERINFO_EMOJIS"), `${emojis}/100`)
        .addField(language("SERVERINFO_VERIFICATION"), message.guild.verificationLevel)
        .setColor(client.color)
        .setFooter(client.footer, client.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }));

        message.channel.send({embed});

        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " days") + " ago";
        };
    }
}

module.exports = new ServerInfo;