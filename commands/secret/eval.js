const Command = require("../../structure/Command.js");

const Discord = require("discord.js");
const SourceBin = require("sourcebin-api");

class Eval extends Command {
    constructor() {
        super({
            name: 'eval',
            category: 'secret',
            description: 'Commande secrète.',
            usage: 'eval [code]'
        });
    }

    async run(client, message, args) {

        
  const embed = new Discord.MessageEmbed()
  .addField("Input", "```js\n" + args.join(" ") + "```");
  
  try {
    const code = args.slice(1).join(' ');
    if (!code) return message.channel.send("Please include the code.");
    let evaled;
    
    // This method is to prevent someone that you trust, open the secret shit here.
    if (code.includes(`SECRET`) || code.includes(`TOKEN`) || code.includes("process.env")) {
      evaled = "No, shut up, what will you do it with the token?";
    } else {
      evaled = eval(code);
    }
    
    if (typeof evaled !== "string") evaled = require("util").inspect(evaled, {depth: 0});
    
    let output = clean(evaled);
    if (output.length > 1024) {
      // If the output was more than 1024 characters, we're gonna export them into the hastebin.
      await SourceBin.postBin({ code: output, title: "YuraBot | sourcebin-api | eval |" })
      .then((res) =>  embed.addField("Output", res).setColor(0x7289DA))
      .catch(error => {
          client.emit('error', error);
      });
    } else {
      embed.addField("Output", "```js\n" + output + "```").setColor(0x7289DA)
    }
    
    message.channel.send({ embeds: [embed] });
    
  } catch (error) {
    let err = clean(error);
    if (err.length > 1024) {
      // Do the same like above if the error output was more than 1024 characters.
      await SourceBin.postBin({ code: err, title: "YuraBot | sourcebin-api | eval |" })
      .then((res) =>  embed.addField("Output", res).setColor("RED"))
      .catch(error => {
          client.emit('error', error);
      });
    } else {
      embed.addField("Output", "```js\n" + err + "```").setColor("RED");
    }
    
    message.channel.send({ embeds: [embed] });
  }




}
}

function clean(string) {
    if (typeof text === "string") {
      return string.replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
    } else {
      return string;
    }
  }

module.exports = new Eval;