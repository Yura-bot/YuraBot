const Config = require('../configs/config.json');

module.exports = (client, message) => {

    if(message.author.bot || !message.channel.guild) return;

    if (message.guild.member(client.user).hasPermission("SEND_MESSAGES") === false)  { return; }
    if (message.guild.id === "110373943822540800") return;

    let guildSettingsExist = client.guildSettings.has(`${message.guild.id}`)

    let prefix;
    let guildLanguage;
    let language;

    if (guildSettingsExist) {
        prefix = client.guildSettings.get(`${message.guild.id}`, "prefix")
        guildLanguage = client.guildSettings.get(`${message.guild.id}`, "lang")

        language = require(`../languages/${guildLanguage}`);

        let automodEnabled = client.guildSettings.has(`${message.guild.id}`, "automodPlug")
        
        if (automodEnabled) {
            antiraid = client.guildSettings.get(`${message.guild.id}`, "automodPlug.antiraid")
            antipub = client.guildSettings.get(`${message.guild.id}`, "automodPlug.antipub")
            antilink = client.guildSettings.get(`${message.guild.id}`, "automodPlug.antilink")
            antibadworlds = client.guildSettings.get(`${message.guild.id}`, "automodPlug.antibadworlds")

            if (antiraid) client.antiSpam.message(message, client)

            if (antilink) {
                if (message.member.hasPermission("MANAGE_MESSAGES") === false) {

                    const link = [
                        "www.",
                        "://",
                        "http",
                        "https",
                        "https://",
                        "http://",
                        ".fr",
                        ".com",
                        ".eu",
                        ".gg"
                 ];
            
                 if (link.some(word => message.content.includes(word))) {
                     message.delete().catch(e => {});
                     /*
                     const link_detect = new Discord.MessageEmbed()
                         .setTitle(language("ANTILINK_TITLE"))
                         .addField(language("ANTILINK_USER"), "<@" + message.author.id + ">")
                         .addField(language("ANTILINK_ACTION"), language("ANTILINK_DELETED"))
                         .setColor("#FFCC4D")
                     */
                     message.reply(language("ANTILINK_SUCESS")).then(msg => msg.delete({timeout: 5000})).catch(e => {});
                 }
                }
            }

            if (antipub) {
                if (message.member.hasPermission("MANAGE_MESSAGES") === false) {

                    const pub = [
                        "discord.me",
                        "discord.io",
                        "discord.gg",
                        "invite.me",
                        "discordapp.com/invite"
                    ];
               
                    if (pub.some(word => message.content.includes(word))) {
                        message.delete().catch(e => {});
                        message.reply(language("ANTIPUB_SUCESS")).then(msg => msg.delete({timeout: 5000})).catch(e => {});
                    }
                }
            }

            if (antibadworlds) {

                if (message.member.hasPermission("MANAGE_MESSAGES") === false) {

                    const banni = require('../configs/badworld.json');
                    if (banni.some(x => message.content.toLowerCase().split(/\s+/).includes(x))) {
                     message.delete(message.author).catch(e => {});
                     message.reply(language("ANTIBADWORLDS_SUCESS")).then(msg => msg.delete({timeout: 5000})).catch(e => {});
                    }
                }
            }
        }

    } else {
        prefix = client.default_prefix;
        guildLanguage = "english"
    }

    language = require(`../languages/${guildLanguage}`);

    if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))){
        if(message.guild){
            return message.channel.send(language("MSG_MENTION", prefix)).catch(e => {});
        } else return;
    }

    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = client.commands.find(cmd => cmd.aliases.includes(args[0])) || client.commands.get(args[0]);
    if(!command) return;

    if(command.permission !== 'everyone') {
        if(!message.member.hasPermission(command.permission)) {
            return message.channel.send(client.snippet.insufficientPermissions(message.author));
        }
    }

    if(command.category === 'secret') {
        if(message.member.id != "477582590329749504") return;
    }

    try { command.run(client, message, args) }
    catch (e) { client.emit('error',e); }
};