const Command = require("../../structure/Command.js");

class FortniteShop extends Command {
    constructor() {
        super({
            name: 'fortnite-shop',
            aliases: ['f-s'],
            category: 'game',
            description: "Permet de voir le shop de fortnite en temps réel.",
            usage: 'fortnite-shop'
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
    
        return message.channel.send("https://ctk-api.herokuapp.com/fortnite-shop").catch(e => {
            return client.emit('error',e, "fortnite-shop");
        });

    }
}

module.exports = new FortniteShop;