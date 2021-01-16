const Command = require("../../structure/Command.js");

class Triggered extends Command {
    constructor() {
        super({
            name: 'triggered',
            aliases: [''],
            category: 'images',
            description: '',
            usage: 'triggered [Membre]'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', size: 512 }).replace(".webp", ".gif") : message.author.avatarURL({ format: 'png', size: 512 }).replace(".webp", ".gif")

        const msg = await message.channel.send(client.getEmoji(client.config.emojis.loading)+language("GENERATION")).catch(e => {
            return client.emit('error',e);
        });

        const buffer = await client.ameApi.generate("triggered", { url: avatar });

        let attachment = new Discord.MessageAttachment(buffer, "triggered.gif");

        const embed = {

            color: Math.floor(Math.random()*16777215),
            //The bot displays the name of the user
            title: `🖼 triggered :`,
            //Attachment
            image: {
                url: 'attachment://triggered.gif',
            },
        };

        message.channel.send(({ files: [attachment], embed: embed })) && msg.delete().catch(e => {
            return client.emit('error',e);
        });
    }
}

module.exports = new Triggered;