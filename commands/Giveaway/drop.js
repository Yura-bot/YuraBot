const Command = require("../../structure/Command.js");

class Drop extends Command {
    constructor() {
        super({
            name: 'drop',
            aliases: [],
            category: 'giveaway',
            description: '',
            usage: 'drop [Lot]'
        });
    }

    async run(client, message, args, db) {

        const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
        const ms = require('ms');

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if(!message.member.permissions.has('MANAGE_MESSAGES')){
            return message.channel.send(language("MISSING_PERMISSION_MANAGE_MESSAGES"));
        }

        let dropPrize = args.slice(1).join(' ');

        if(!dropPrize){
            return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_DROP"));
        }
        
        const embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setColor("#D8FF00")
        .setTitle("🎁 » __**DROP**__")
        .setDescription(`${language("DROP_DESC_1").replace("{author}", message.author)} ⋄ **${message.author.tag}** \n${language("DROP_DESC_2").replace("{dropPrize}", dropPrize)}`)

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('primary')
                .setStyle('PRIMARY')
                .setEmoji('🎊'),
        );

        const msg = await message.channel.send({ embeds: [embed], components: [row] })

        const collector = message.channel.createMessageComponentCollector({ time: 600000 });
        //const collector = message.createMessageComponentCollector({ componentType: 'BUTTON', max: 1, maxUsers: 1, time: 600000 });

        collector.on('collect', async i => {
            const winEmbed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setColor("#D8FF00")
            .setTitle("🎁 » __**DROP**__")
            .setDescription(`${language("DROP_WIN_DESC_1").replace("{dropPrize}", dropPrize)}${language("DROP_WIN_DESC_2").replace("{winner}", i.member.id)} ⋄ **${i.member.user.tag}**`)
            await msg.edit({ embeds: [ winEmbed ] });
        });
    }
}

module.exports = new Drop;