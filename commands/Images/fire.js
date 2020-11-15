const Command = require("../../structure/Command.js");

class Fire extends Command {
    constructor() {
        super({
            name: 'fire',
            aliases: [''],
            category: 'images',
            description: '',
            usage: 'fire [Membre]'
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

        let user = message.guild.member(message.mentions.users.first()) || message.author;
        let avatar = user.displayAvatarURL({ size: 512 }).replace(".webp", ".png")

        const msg = await message.channel.send(client.getEmoji(client.config.emojis.loading)+language("GENERATION")).catch(e => {
            return client.emit('error',e);
        });

        const buffer = await client.ameApi.generate("fire", { url: avatar });

        let attachment = new Discord.MessageAttachment(buffer, "fire.png");

        const embed = {

            color: Math.floor(Math.random()*16777215),
            //The bot displays the name of the user
            title: `🖼 Fire :`,
            //Attachment
            image: {
                url: 'attachment://fire.png',
            },
        };

        message.channel.send(({ files: [attachment], embed: embed })) && msg.delete().catch(e => {
            return client.emit('error',e);
        });
    }
}

module.exports = new Fire;