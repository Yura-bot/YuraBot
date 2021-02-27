const Command = require("../../structure/Command.js");

class Lookwhatkarenhave extends Command {
    constructor() {
        super({
            name: 'lookwhatkarenhave',
            aliases: ['lwkh'],
            category: 'images',
            description: '',
            usage: 'lookwhatkarenhave [Membre]'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', size: 512 }).replace(".webp", ".png") : message.author.avatarURL({ format: 'png', size: 512 }).replace(".webp", ".png")

        const msg = await message.channel.send(client.config.emojis.loading+language("GENERATION")).catch(e => {
            return client.emit('error',e);
        });

        const buffer = await client.ameApi.generate("lookwhatkarenhave", { url: avatar });

        let attachment = new Discord.MessageAttachment(buffer, "lookwhatkarenhave.png");

        const embed = {

            color: Math.floor(Math.random()*16777215),
            //The bot displays the name of the user
            title: `🖼 Lookwhatkarenhave :`,
            //Attachment
            image: {
                url: 'attachment://lookwhatkarenhave.png',
            },
        };

        message.channel.send(({ files: [attachment], embed: embed })) && msg.delete().catch(e => {
            return client.emit('error',e);
        });
    }
}

module.exports = new Lookwhatkarenhave;