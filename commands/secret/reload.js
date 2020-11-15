const Command = require("../../structure/Command.js");

class Reload extends Command {
    constructor() {
        super({
            name: 'reload',
            aliases: [''],
            category: 'secret',
            description: 'Reload une cmd',
            usage: 'reload <catégorie> <cmd>'
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

        let caN = args[0]
        let cmdN = args[1];
      
        if(!caN) return message.reply("Votre syntaxe est incorrecte. \n```Syntaxe : "+prefix+"reload <cathegorie> <cmd>```");
        if(!cmdN) return message.reply("Votre syntaxe est incorrecte. \n```Syntaxe : "+prefix+"reload <cathegorie> <cmd>```");
      
        let commandName = args[1].toLowerCase()
      
      
        if (caN === "Admin") {
      
        try {
          delete require.cache[require.resolve(`../../commands/Administrations/${commandName}.js`)]
          client.commands.delete(commandName)
          const pull = require(`../../commands/Administrations/${commandName}.js`)
          client.commands.set(commandName, pull)
        } catch(e) {
            return message.channel.send("Erreur" + e)
        }
      
        }
      
        if (caN === "Eco") {
      
          try {
            delete require.cache[require.resolve(`../../commands/Economy/${commandName}.js`)]
            client.commands.delete(commandName)
            const pull = require(`../../commands/Economy/${commandName}.js`)
            client.commands.set(commandName, pull)
          } catch(e) {
              return message.channel.send("Erreur" + e)
          }
        
        }
      
        if (caN === "Fun") {
      
          try {
            delete require.cache[require.resolve(`../../commands/Fun/${commandName}.js`)]
            client.commands.delete(commandName)
            const pull = require(`../../commands/Fun/${commandName}.js`)
            client.commands.set(commandName, pull)
          } catch(e) {
              return message.channel.send("Erreur" + e)
          }
        
        }
      
        if (caN === "Giveaway") {
      
          try {
            delete require.cache[require.resolve(`../../commands/Giveaway/${commandName}.js`)]
            client.commands.delete(commandName)
            const pull = require(`../../commands/Giveaway/${commandName}.js`)
            client.commands.set(commandName, pull)
          } catch(e) {
              return message.channel.send("Erreur" + e)
          }
        
        }
      
        if (caN === "Mod") {
      
          try {
            delete require.cache[require.resolve(`../../commands/Moderations/${commandName}.js`)]
            client.commands.delete(commandName)
            const pull = require(`../../commands/Moderations/${commandName}.js`)
            client.commands.set(commandName, pull)
          } catch(e) {
              return message.channel.send("Erreur" + e)
          }
        
        }
      
        if (caN === "Music") {
      
          try {
            delete require.cache[require.resolve(`../../commands/Musiques/${commandName}.js`)]
            client.commands.delete(commandName)
            const pull = require(`../../commands/Musiques/${commandName}.js`)
            client.commands.set(commandName, pull)
          } catch(e) {
              return message.channel.send("Erreur" + e)
          }
        
        }
      
        if (caN === "NSFW") {
      
          try {
            delete require.cache[require.resolve(`../../commands/NSFW/${commandName}.js`)]
            client.commands.delete(commandName)
            const pull = require(`../../commands/NSFW/${commandName}.js`)
            client.commands.set(commandName, pull)
          } catch(e) {
              return message.channel.send("Erreur" + e)
          }
        
        }
      
        if (caN === "Util") {
      
          try {
            delete require.cache[require.resolve(`../../commands/Util/${commandName}.js`)]
            client.commands.delete(commandName)
            const pull = require(`../../commands/Util/${commandName}.js`)
            client.commands.set(commandName, pull)
          } catch(e) {
              return message.channel.send("Erreur" + e)
          }
        
        }
      
        if (caN === "Img") {
      
          try {
            delete require.cache[require.resolve(`../../commands/Images/${commandName}.js`)]
            client.commands.delete(commandName)
            const pull = require(`../../commands/Images/${commandName}.js`)
            client.commands.set(commandName, pull)
          } catch(e) {
              return message.channel.send("Erreur" + e)
          }
        
        }
      
        message.channel.send({embed: {color: '0x00FF46', description: `<:check:673212026226737153> | La comande ${args[1].toLowerCase()} a été reload!` }})

    }
}

module.exports = new Reload;