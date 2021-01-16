const Command = require("../../structure/Command.js");

class Discordhouse extends Command {
    constructor() {
        super({
            name: 'discordhouse',
            aliases: [''],
            category: 'images',
            description: '',
            usage: 'discordhouse [Membre] (house) '
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', size: 512 }).replace(".webp", ".png") : message.author.avatarURL({ format: 'png', size: 512 }).replace(".webp", ".png")
        let houseNumber = message.mentions.users.size ? message.mentions.users.flags : message.author.flags
        let houseName;

        if (houseNumber === 64) {
            houseName = "bravery";
        } 
        if (houseNumber === 128)  {
            houseName = "brilliance";
        }
        if (houseNumber === 256)  {
            houseName = "balance";
        }
        
        const msg = await message.channel.send(client.getEmoji(client.config.emojis.loading)+language("GENERATION")).catch(e => {
            return client.emit('error',e);
        });

        const buffer = await client.ameApi.generate("discordhouse", { url: avatar, house: houseName });

        let attachment = new Discord.MessageAttachment(buffer, "discordhouse.png");

        const embed = {

            color: Math.floor(Math.random()*16777215),
            //The bot displays the name of the user
            title: `🖼 Discordhouse :`,
            //Attachment
            image: {
                url: 'attachment://discordhouse.png',
            },
        };

        message.channel.send(({ files: [attachment], embed: embed })) && msg.delete().catch(e => {
            return client.emit('error',e);
        });
    }
}

module.exports = new Discordhouse;