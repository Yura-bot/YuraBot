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

      let caN = args[1]
      let cmdN = args[2];
    
      if(!caN) return message.reply("Votre syntaxe est incorrecte. \n```Syntaxe : reload <cathegorie> <cmd>```");
      if(!cmdN) return message.reply("Votre syntaxe est incorrecte. \n```Syntaxe : reload <cathegorie> <cmd>```");

      const Ccommand = message.client.commands.get(cmdN);
      if (!Ccommand) return message.channel.send(`There is no command with name or alias \`${cmdN}\`, ${message.author}!`);
    
      let commandName = args[2].toLowerCase()

      if (caN === "Admin") {
    
        try {

          delete require.cache[require.resolve(`../../commands/Admin/${commandName}.js`)]
          message.client.commands.delete(commandName)

          const command = require(`../../commands/Admin/${commandName}.js`)
          message.client.commands.set(command.name, command);

        } catch(e) {
            return message.channel.send("Erreur" + e)
        }
      
        return message.channel.send({embed: {color: '0x00FF46', description: `<:check:673212026226737153> | La comande ${Ccommand.name} a été reload!` }})
      }

      if (caN === "Bot") {
    
        try {

          delete require.cache[require.resolve(`../../commands/Bot/${commandName}.js`)]
          message.client.commands.delete(commandName)

          const command = require(`../../commands/Bot/${commandName}.js`)
          message.client.commands.set(command.name, command);

        } catch(e) {
            return message.channel.send("Erreur" + e)
        }
      
        return message.channel.send({embed: {color: '0x00FF46', description: `<:check:673212026226737153> | La comande ${Ccommand.name} a été reload!` }})
      }

      if (caN === "Fun") {
    
        try {

          delete require.cache[require.resolve(`../../commands/Fun/${commandName}.js`)]
          message.client.commands.delete(commandName)

          const command = require(`../../commands/Fun/${commandName}.js`)
          message.client.commands.set(command.name, command);

        } catch(e) {
            return message.channel.send("Erreur" + e)
        }
      
        return message.channel.send({embed: {color: '0x00FF46', description: `<:check:673212026226737153> | La comande ${Ccommand.name} a été reload!` }})
      }

      if (caN === "Game") {
    
        try {

          delete require.cache[require.resolve(`../../commands/Game/${commandName}.js`)]
          message.client.commands.delete(commandName)

          const command = require(`../../commands/Game/${commandName}.js`)
          message.client.commands.set(command.name, command);

        } catch(e) {
            return message.channel.send("Erreur" + e)
        }
      
        return message.channel.send({embed: {color: '0x00FF46', description: `<:check:673212026226737153> | La comande ${Ccommand.name} a été reload!` }})
      }

      if (caN === "Giv") {
    
        try {

          delete require.cache[require.resolve(`../../commands/Giveaway/${commandName}.js`)]
          message.client.commands.delete(commandName)

          const command = require(`../../commands/Giveaway/${commandName}.js`)
          message.client.commands.set(command.name, command);

        } catch(e) {
            return message.channel.send("Erreur" + e)
        }
      
        return message.channel.send({embed: {color: '0x00FF46', description: `<:check:673212026226737153> | La comande ${Ccommand.name} a été reload!` }})
      }

      if (caN === "Images") {
    
        try {

          delete require.cache[require.resolve(`../../commands/Images/${commandName}.js`)]
          message.client.commands.delete(commandName)

          const command = require(`../../commands/Images/${commandName}.js`)
          message.client.commands.set(command.name, command);

        } catch(e) {
            return message.channel.send("Erreur" + e)
        }
      
        return message.channel.send({embed: {color: '0x00FF46', description: `<:check:673212026226737153> | La comande ${Ccommand.name} a été reload!` }})
      }

      if (caN === "Mod") {
    
        try {

          delete require.cache[require.resolve(`../../commands/Moderation/${commandName}.js`)]
          message.client.commands.delete(commandName)

          const command = require(`../../commands/Moderation/${commandName}.js`)
          message.client.commands.set(command.name, command);

        } catch(e) {
            return message.channel.send("Erreur" + e)
        }
      
        return message.channel.send({embed: {color: '0x00FF46', description: `<:check:673212026226737153> | La comande ${Ccommand.name} a été reload!` }})
      }

      if (caN === "Music") {
    
        try {

          delete require.cache[require.resolve(`../../commands/Musique/${commandName}.js`)]
          message.client.commands.delete(commandName)

          const command = require(`../../commands/Musique/${commandName}.js`)
          message.client.commands.set(command.name, command);

        } catch(e) {
            return message.channel.send("Erreur" + e)
        }
      
        return message.channel.send({embed: {color: '0x00FF46', description: `<:check:673212026226737153> | La comande ${Ccommand.name} a été reload!` }})
      }

      if (caN === "NSFW") {
    
        try {

          delete require.cache[require.resolve(`../../commands/NSFW/${commandName}.js`)]
          message.client.commands.delete(commandName)

          const command = require(`../../commands/NSFW/${commandName}.js`)
          message.client.commands.set(command.name, command);

        } catch(e) {
            return message.channel.send("Erreur" + e)
        }
      
        return message.channel.send({embed: {color: '0x00FF46', description: `<:check:673212026226737153> | La comande ${Ccommand.name} a été reload!` }})
      }
    
      if (caN === "Utils") {
    
        try {

          delete require.cache[require.resolve(`../../commands/Utils/${commandName}.js`)]
          message.client.commands.delete(commandName)

          const command = require(`../../commands/Utils/${commandName}.js`)
          message.client.commands.set(command.name, command);

        } catch(e) {
            return message.channel.send("Erreur" + e)
        }
      
        return message.channel.send({embed: {color: '0x00FF46', description: `<:check:673212026226737153> | La comande ${Ccommand.name} a été reload!` }})
      }

      message.channel.send({embed: { description: ` Pas de catégorie trouvé !` }})

    }
}

module.exports = new Reload;