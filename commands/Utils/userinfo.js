const Command = require("../../structure/Command.js");

class UserInfo extends Command {
    constructor() {
        super({
            name: 'userinfo',
            aliases: ['ui', 'u-i'],
            category: 'utils',
            description: "Permet de voir les informations d'un utilisateur.",
            usage: 'userinfo <`rien`|`@user`|`id`>'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");
        const moment = require("moment")

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

		let displayPresence = true;
		const isID = !isNaN(args[1]);
        var user;
        let avatar;
        
		if(!args[1]){
            user = message.author;
            avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
        }
        
		if(message.mentions.users.first()){
            user = message.mentions.users.first();
            avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
        }
        
		if(isID && !user){
            user = client.users.cache.get(args[1]);
            avatar = user.avatarURL({ format: 'png', dynamic: true, size: 2048 })
			if(!user){
				user = await client.users.fetch(args[1], true).catch(() => {});
				displayPresence = false;
			}
		}
        
		if(!user){
            return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_USERINFO"));
		}

		let member = null;
		if(message.guild){
			member = await message.guild.members.fetch(user).catch(() => {});
        }

        let pseudo = member.user.username;
        let tag = member.user.discriminator;
        let date_join = moment(member.joinedAt).format("D/MM/YY à HH:mm")
        let lastmsg = member.lastMessage;
        let id = member.id;
        let nickname = member.nickname;
        let date_created = moment(member.user.createdAt).format("D/MM/YY à HH:mm")
    
    
        if (!nickname) {
            nickname = 'Pas de surnom'
        }
        if (!lastmsg) {
            lastmsg = 'Inconnu'
        }
        let jeu = member.presence.game;
        if (!jeu) {
            jeu = 'Pas de jeu'
        }
        let status = member.presence.status;
        if (status === "dnd") {
            status = '<:dnd:675371548651159573> Ne pas déranger'
        }
        if (status === "idle") {
            status = '<:idle:675371429264359424> Inactif - AFK '
        }
        if (status === "online") {
            status = '<:online:675371850905157653> En ligne'
        }
        if (status === "offline") {
            status = '<:offline:675371685792186409> Déconnecté'
        }
    
        let embed = new Discord.MessageEmbed()
            .setAuthor('Informations sur ' + pseudo)
            .setThumbnail(avatar)
            .setColor(client.color)
            .addField(language("USERINFO_PSEUDO"), pseudo)
            .addField(language("USERINFO_TAG"), tag)
            .addField(language("USERINFO_SURNOM"), nickname)
            .addField(language("USERINFO_ID"), id)
            .addField(language("USERINFO_ARIVATEDATE") + message.guild.name + " ➜**", date_join)
            .addField(language("USERINFO_CREATEDAT"), date_created)
            .addField(language("USERINFO_LASTMSG"), lastmsg + " ")
            .addField(language("USERINFO_GAME"), jeu)
            .addField(language("USERINFO_STATUS"), status)
            .setFooter(client.footer)
            .setTimestamp();
    
        message.channel.send(embed);
    }
}

module.exports = new UserInfo;