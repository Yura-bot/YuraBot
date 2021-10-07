const Command = require("../../structure/Command.js");

class Config extends Command {
    constructor() {
        super({
            name: 'config',
            aliases: ['configuration'],
            category: 'admin',
            description: "Affiche un message pour savoir ou configurer le bot.",
            usage: 'config'
        });
    }

    async run(client, message, args, db) {

        const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require('discord.js');

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Prefix')
					.setStyle('PRIMARY')
                    .setEmoji('675367617250328598'),
                new MessageButton()
					.setCustomId('sec')
					.setLabel('Language')
					.setStyle('SECONDARY')
                    .setEmoji('788834570447487006'),
			);

        const Embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(language("CONFIG_EMBED_TITLE"))
        .setURL(client.url)
        .setAuthor(message.author.username, message.author.avatarURL(), client.url)
        .setThumbnail(client.user.displayAvatarURL({format: 'png'}))
        .setDescription(
            language("CONFIG_EMBED_DESC_1") +
            language("CONFIG_EMBED_DESC_2") +
            language("CONFIG_EMBED_DESC_3") + "\n\n" +
            language("DASHCONFIG")
        )
        .setTimestamp()
        .setFooter(client.footer,  client.user.displayAvatarURL({format: 'png'}));
    
        message.channel.send({ embeds: [Embed], components: [row] })

        const collector = message.channel.createMessageComponentCollector({ time: 300000 });

        collector.on('collect', async i => {
            if (i.customId === 'primary') {
                await i.reply(language("CONFIG_PREFIX"))

                i.message.channel.awaitMessages({ max: 1, time: 120000, errors: ['time'] }).then(async collected => {
                    collected = collected.first()
                    let prefix = collected.content
                    if(prefix.length > 3) return message.channel.send(language("CONFIG_PREFIX_ERROR"))
                    message.channel.send(language("CONFIG_NEW_PREFIX").replace("{prefix}", prefix)).then(() => {
                        collected.delete()
                    })
                    db.prefix = prefix.split(' ')[0];
                    await db.save();
                });
            }

            if (i.customId === 'sec') {
                const MenuLAng = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('select')
                        .setPlaceholder('Nothing selected')
                        .addOptions([
                            {
                                label: 'Français',
                                emoji: '<:frenchflag:788834553002983455>',
                                value: 'french',
                            },
                            {
                                label: 'English',
                                emoji: '<:englishflag:788834570447487006>',
                                value: 'english',
                            },
                        ]),
                );
                await i.reply({ content: language("CONFIG_LANG"), components: [MenuLAng] });
            }
        });
    }
}

module.exports = new Config;