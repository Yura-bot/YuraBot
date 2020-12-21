const Command = require("../../structure/Command.js");

class UnMute extends Command {
    constructor() {
        super({
            name: 'unmute',
            aliases: [],
            category: 'mod',
            description: "Permet d'enlever le mode muet une personne",
            usage: 'unmute [Membre]'
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

        if (!message.member.hasPermission("MANAGE_ROLES")) {
            var error_permissions = new Discord.MessageEmbed()
                .setDescription(language("MISSING_PERMISSION_MANAGE_ROLES"))
                .setColor("#F43436")
            return message.channel.send(error_permissions)
        }

        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send(language("BOT_PERMISSION_MANAGE_ROLES"));
        }

        const usermute = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[1]);

        if (!usermute) {
            return message.channel.send(
              language("SYNTAXE") + prefix + language("SYNTAXE_UNMUTE")
            );
        }

        let muterole;

        let hasDB = client.guildSettings.has(`${message.guild.id}`, "muteRole")
        if (hasDB) {

            let roleID = client.guildSettings.get(`${message.guild.id}`, "muteRole")
            if (message.guild.roles.cache.has(roleID)) {
                muterole = message.guild.roles.cache.get(roleID);
            }
            else {
                muterole = message.guild.roles.cache.find(x => x.name === "Muted")
            }

        } else {
            muterole = message.guild.roles.cache.find(x => x.name === "Muted")
        }

        if(usermute.roles.cache.has(muterole.id) === false) {
            return message.channel.send(language("UNMUTE_NOMUTE"))
        }

        usermute.roles.remove(muterole).catch(e =>{
            message.channel.send(language("UNMUTE_ERROR"))
            return client.emit('error',e, "unmute");
        });
          
        await message.channel.send(language("UNMUTE_SUCESS", usermute))
        
        usermute.send(language("UNMUTE_SENDUSER", message.guild.name)).catch(e =>{
            message.channel.send(language("MUTE_SUCESS_MPCLOSE"))
        });
    }
}

module.exports = new UnMute;