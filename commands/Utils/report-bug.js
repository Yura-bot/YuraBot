const Command = require("../../structure/Command.js");

class Reportbug extends Command {
    constructor() {
        super({
            name: 'report-bug',
            aliases: ['r-b'],
            category: 'utils',
            description: 'Permet de signaler un bug sur le bot.',
            usage: 'report-bug [Description]'
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

        let arg = message.content.split(" ").slice(1);
        let thingToEcho = arg.join(" ");
      
        if(!args[0]) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_REPORT_BUG"));
      
        const embed = new Discord.MessageEmbed()
          .setDescription("Nouveau bug !")
          .addField("💼 __Auteur :__", "" + message.author.tag + "")
          .addField("📝 __Description :__", thingToEcho, true)
          .setColor("#FFD97C")
      
        client.channels.cache.get("665849951904989197").send(embed);
      
    }
}

module.exports = new Reportbug;