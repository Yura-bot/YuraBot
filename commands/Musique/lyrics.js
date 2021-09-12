const Command = require("../../structure/Command.js");

class Lyrics extends Command {
    constructor() {
        super({
            name: 'lyrics',
            aliases: [''],
            category: 'music',
            description: 'Permet de voir les paroles d\'une musique.',
            usage: 'lyrics [music]'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        const songName = args.slice(1).join(' ');
        if(!songName) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_LYRICS"));

		try {
			
			await client.lyricsClient.search(songName).then(info => {
				const embed = new Discord.MessageEmbed()
				.setAuthor(language("LYRICS_TITLE").replace("${songName}", info.title))
				.setURL(info.url)
				.setDescription(info.lyrics)
				.setThumbnail(info.thumbnail)
				.setColor(client.color)
				.setFooter(client.footer, client.user.displayAvatarURL)
				.setTimestamp()
	
				message.channel.send({ embeds: [embed] });
			})

		} catch(e){
			message.channel.send(language("LYRICS_ERROR"));
		}

        return;
    }
}

module.exports = new Lyrics;