const Command = require("../../structure/Command.js");

class Cooldown extends Command {
    constructor() {
        super({
            name: 'cooldown',
            aliases: ['countdown', 'rapel', 'timer'],
            category: 'utils',
            description: 'Permet de crée un rapel.',
            usage: 'cooldown [temps]'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");
        const ms = require("ms")

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        let user = message.author;
        let time = args[1];
      
        if(!time) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_COOLDOWN"));
      
        message.channel.send({embeds: [{color: '0x00FF46', description: language("COOLDOWN_SUCESS").replace("${time}", time) }] })
      
        function mafonction() { message.channel.send("**<@" + user + ">**") && message.channel.send({embeds: [{color: '0xFF0000', description: language("COOLDOWN_STOP").replace("${time}", time) }]}) }
        setTimeout(mafonction, ms(time)); 
    }
}

module.exports = new Cooldown;
