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
        const fetch = require("node-fetch");
        const cheerio = require("cheerio");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        const songName = args.slice(1).join(' ');
        if(!songName) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_LYRICS"));
		
		const embed = new Discord.MessageEmbed()
			.setAuthor(language("LYRICS_TITLE").replace("{songName}", songName))
			.setColor(client.color)
            .setFooter(client.footer, client.user.displayAvatarURL)
            .setTimestamp();

		try {

			const songNameFormated = songName
				.toLowerCase()
				.replace(/\(lyrics|lyric|official music video|audio|official|official video|official video hd|clip officiel|clip|extended|hq\)/g, "")
				.split(" ").join("%20");

			let res = await fetch(`https://www.musixmatch.com/search/${songNameFormated}`);
			res = await res.text();
			let $ = await cheerio.load(res);
			const songLink = `https://musixmatch.com${$("h2[class=\"media-card-title\"]").find("a").attr("href")}`;

			res = await fetch(songLink);
			res = await res.text();
			$ = await cheerio.load(res);

			let lyrics = await $("p[class=\"mxm-lyrics__content \"]").text();

			if(lyrics.length > 2048) {
				lyrics = lyrics.substr(0, 2031) + language("LYRICS_AND_MORE") + " ["+language("LYRICS_CLICK_HERE")+"]"+`https://www.musixmatch.com/search/${songName}`;
			} else if(!lyrics.length) {
				return message.channel.send(language("LYRICS_NO_FOUND").replace("{songName}", songName));
			}

			embed.setDescription(lyrics);
			message.channel.send(embed);

		} catch(e){
			message.channel.send(language("LYRICS_ERROR"));
		}

        return;
    }
}

module.exports = new Lyrics;