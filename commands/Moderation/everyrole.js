const Command = require("../../structure/Command.js");

class EveryRole extends Command {
    constructor() {
        super({
            name: 'everyrole',
            aliases: ['ev-ro', 'everyoneaddrole'],
            category: 'mod',
            description: 'Donne un role à toutes les personnes du serveur.',
            usage: 'everyrole [Role]'
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

        if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply(language("BOT_PERMISSION_MANAGE_ROLES"));

        if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply(language("BOT_PERMISSION_MANAGE_ROLES"));
    
        var role = message.mentions.roles.first();
        if(!role && !args[1]) return message.reply(language("EVERYROLE_MENTION"));
        else {
            if(role){
                message.channel.send(language("EVERYROLE_SUCESS", role));
                message.guild.members.cache.forEach(element => {
                    element.roles.add(role);
                });
            } else {
                role = message.guild.roles.cache.find(e => e.name === args.slice(1).join(' '));
                if(!role) return message.channel.send(language("EVERYROLE_NO_ROLEFOUND", role));
                message.channel.send(language("EVERYROLE_SUCESS", role));
                message.guild.members.cache.forEach(element => {
                    element.roles.add(role);
                });
            }
        }
    }
}

module.exports = new EveryRole;