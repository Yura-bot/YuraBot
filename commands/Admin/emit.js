const Command = require("../../structure/Command.js");

class Emit extends Command {
    constructor() {
        super({
            name: 'emit',
            aliases: ['event-emit'],
            category: 'admin',
            description: "Permet de simuler une arrivé ou un départ d'un membre sur votre serveur.",
            usage: 'emit [event]'
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

        if(!message.member.hasPermission("ADMINISTRATOR")) {
            var error_permissions = new Discord.MessageEmbed()
                .setDescription(language("MISSING_PERMISSION_ADMINISTRATOR"))
                .setColor("#F43436")
            return message.channel.send(error_permissions)
        }

        if (message.member.hasPermission("ADMINISTRATOR")) {

            let event = args[1]
            if (!event) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_EMIT"))

            if (event === "welcome") {
                client.emit("guildMemberAdd", message.member)
                message.channel.send({embed: {color: '0x00FF46', description: `${language("EMIT_WELCOME_SUCESS")}` }})
            } else if (event === "goodbye") {
                client.emit("guildMemberRemove", message.member)
                message.channel.send({embed: {color: '0x00FF46', description: `${language("EMIT_GOODBYE_SUCESS")}` }})
            } else {
                return message.channel.send({embed: {color: '0xFF0000', description: language("EMIT_ERROR") }})
            }
        }
    }
}

module.exports = new Emit;