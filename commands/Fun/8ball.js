const Command = require("../../structure/Command.js");

class Ball8 extends Command {
    constructor() {
        super({
            name: '8ball',
            aliases: [''],
            category: 'fun',
            description: 'Pose une question au bot et il  te réponderra !',
            usage: '8ball [Question]'
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

        if (!args[2]) return message.reply(language("SYNTAXE") + prefix + language("SYNTAXE_8BALL"));
  
        let replies = [language("YES"), language("NO"), language("PEUT_ETRE"), language("PROB_YES"), language("PROB_NO")];
        let question = args.slice(0).join(" ");
        let res = Math.floor(Math.random() * replies.length);
        
        let askEmbed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag)
          .setColor(client.color)
          .addField(language("QUESTION"), question)
          .addField(language("REPONSE"), replies[res]);
        
        message.channel.send(askEmbed).catch(e => {
            return client.emit('error',e, "8ball");
        });
    }
}

module.exports = new Ball8;