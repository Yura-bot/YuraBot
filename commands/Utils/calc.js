const Command = require("../../structure/Command.js");

class Calc extends Command {
    constructor() {
        super({
            name: 'calc',
            aliases: ['calculer'],
            category: 'utils',
            description: 'Permet simplement de calculer.',
            usage: 'calc [opération]'
        });
    }

    async run(client, message, args) {

        const Discord = require("discord.js");
        const { evaluate } = require("mathjs")

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

        let calcul = args.slice(1).join(' ');
        calcul = calcul.replace(/['x'_]/g,'*')
    
        if(!calcul) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_CALC"));

        try {
            evaluate(calcul);
            return message.channel.send(language("CALC_SUCESS")+calcul+" = "+result+"```")
        } catch (error) {
           return message.channel.send(language("CALC_ERROR"));
        }
    }
}

module.exports = new Calc;