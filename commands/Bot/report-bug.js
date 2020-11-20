const Command = require("../../structure/Command.js");

class ReportBug extends Command {
    constructor() {
        super({
            name: 'report-bug',
            aliases: [''],
            category: 'bot',
            description: "Permet de signaler un bug à l'équipe de développement.",
            usage: 'report-bug [bug]'
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

        let contenu = args.slice(1).join(" ")
      
        if(!args[1]) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_REPORT_BUG"));

        const embed = new Discord.MessageEmbed()
          .setDescription("Nouveau bug !")
          .addField("💼 __Auteur :__", "" + message.author.tag + "")
          .addField("📝 __Description :__", contenu, true)
          .setColor("#FFD97C")
      
          client.channels.cache.get("665849951904989197").send(embed);
    }
}

module.exports = new ReportBug;