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

    async run(client, message, args, db) {

        const Discord = require("discord.js");
        const { Calculator } = require('weky');
        const { evaluate } = require("mathjs")

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        await Calculator({
			message: message,
			embed: {
				title: language("CLAC_TITLE"),
				color: '#5865F2',
				footer: client.footer,
				timestamp: true,
			},
			disabledQuery: language("CLAC_DISABLED"),
			invalidQuery: language("CLAC_INVALID"),
			othersMessage: language("CLAC_OTHER"),
		});

        return;

        let calcul = args.slice(1).join(' ');
        calcul = calcul.replace(/['x'_]/g,'*')
    
        if(!calcul) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_CALC"));

        try {
            let result = evaluate(calcul);
            return message.channel.send(language("CALC_SUCESS")+calcul+" = "+result+"```")
        } catch (error) {
           return message.channel.send(language("CALC_ERROR"));
        }
    }
}

module.exports = new Calc;