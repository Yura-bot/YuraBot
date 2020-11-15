const Command = require("../../structure/Command.js");

class Cooldown extends Command {
    constructor() {
        super({
            name: 'cooldown',
            aliases: ['countdown', 'rapel'],
            category: 'utils',
            description: 'Permet de crée un rapel.',
            usage: 'cooldown [temps]'
        });
    }

    async run(client, message, args) {

        const Discord = require("discord.js");
        const ms = require("ms");

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

        let user = message.author;
        let time = args[1];
      
        if(!time) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_COOLDOWN"));
      
        message.channel.send({embed: {color: '0x00FF46', description: `${language("COOLDOWN_SUCESS")}${time}${language("COOLDOWN_END")}` }})
      
        function mafonction() { message.channel.send("**<@" + user + ">**") && message.channel.send({embed: {color: '0xFF0000', description: `${language("COOLDOWN_STOP")}${time}${language("COOLDOWN_END")}` }}) }
        setTimeout(mafonction, ms(time)); 
    }
}

module.exports = new Cooldown;