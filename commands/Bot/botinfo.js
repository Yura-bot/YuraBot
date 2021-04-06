const Command = require("../../structure/Command.js");

class BotInfo extends Command {
    constructor() {
        super({
            name: 'botinfo',
            aliases: ['bi'],
            category: 'bot',
            description: 'Vous donne des informations sur le bot.',
            usage: 'botinfo'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");
        const { version } = require("discord.js");
        const moment = require("moment")

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        let owner = client.users.cache.get(client.config.owner)

        let uptimeArray = []
        format(process.uptime()).replace(':', ' ').replace(':', ' ').replace(':', ' ').split(' ').forEach(element => uptimeArray.push(element));

        function format(seconds){
            function pad(s){
              return (s < 10 ? '0' : '') + s;
            }
            var hours = Math.floor(seconds / (60*60));
            var minutes = Math.floor(seconds % (60*60) / 60);
            var seconds = Math.floor(seconds % 60);
          
            return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
        }

        let days = uptimeArray[0]
        let hours = uptimeArray[1]
        let minutes = uptimeArray[2]
      
        let cpuStat = require("cpu-stat");
        let os = require('os');
        let cpuLol; 
        cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        })

        let guildCount = await client.shard.fetchClientValues('guilds.cache.size')
        let membersCount = await client.shard.fetchClientValues("users.cache.size");
        let channelsCount = await client.shard.fetchClientValues("channels.cache.size");
        const reducer = (p, count) => p + count

        var botinfo = new Discord.MessageEmbed()
            .setColor("#0000FF")
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(language("BOTINFO_TITLE"))
            .addField(language("BOTINFO_CREATOR"), "- ``"+owner.tag+"``")
            .addField(language("BOTINFO_UPTIME"), `__${days}__ j, __${hours}__ h, __${minutes}__ m`)
            .addField(language("BOTINFO_INFOS"), `- \`ID\` → ${client.user.id}\n- \`Langage\` → ${language("LANGUAGE")} \n- \`Prefix\` → **${prefix}**`)
            .addField(language("BOTINFO_STATS"), language("BOTINFO_STATS_SERVERS")+guildCount.reduce(reducer)+"\n"+language("BOTINFO_STATS_USERS")+membersCount.reduce(reducer)+"\n"+language("BOTINFO_STATS_CHANNELS")+channelsCount.reduce(reducer)+"\n"+language("BOTINFO_STATS_PING")+Math.round(client.ws.ping)+" ms", true)
            .addField(language("BOTINFO_VERSION"), "NodeJS : " + "`v14.15.3`" + "\n" + "DiscordJS : " + "`" + `v${version}` + "`" + "")
            .addField(language("BOTINFO_SYSTEM"), language("SYSTEMINFO_PLATEFORM") + "`" +  `linux (debian 10)`+ "` \n Arch : " + "`" + `${os.arch()}` + "` \n CPU : " +  "`" + `${os.cpus().map(i => `${i.model}`)[0]}` + "`")
            .addField(language("SYSTEMINFO_CPU"), "RAM : " + "`" + `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}` + language("SYSTEMINFO_PING") + "`" + `${Math.round(client.ws.ping)}` + " ms !`")
            .addField(language("BOTINFO_LINKS"), `[${language("HELP_WEBSITE")}](https://yurabot.xyz) | [${language("HELP_INVITEBOT")}](https://discordapp.com/oauth2/authorize?client_id=662775890194989066&scope=bot&permissions=2146958847) | [${language("HELP_SERVSUPPORT")}](https://discord.gg/etQ3uJN) | [Dashboard](https://dash.yurabot.xyz) | [Status](https://yurabot.xyz/status)`)
            .setFooter(client.footer, client.user.displayAvatarURL)
            .setTimestamp();
            message.channel.send(botinfo);
    }
}

module.exports = new BotInfo;