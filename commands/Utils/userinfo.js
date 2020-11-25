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

    async run(client, message, args) {

        const Discord = require("discord.js");
        const moment = require("moment");

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

        let member = message.mentions.users.first();

        if (!args[1]) {
            member = message.member;
        }

        if (!member && args[1]) {
            member = message.guild.members.cache.get(args[1]);
            if (!member) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_USERINFO"));
        }

        let pseudo = member.user.username;
        let tag = member.user.discriminator;
        let date_join = moment(member.joinedAt).format("D/MM/YY à HH:mm")
        let lastmsg = member.lastMessage;
        let id = member.id;
        let nickname = member.nickname;
        let avatar = member.user.avatarURL({ dynamic: true });
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
            .addField(language("USERINFO_PSEUDO"), pseudo, true)
            .addField(language("USERINFO_TAG"), tag, true)
            .addField(language("USERINFO_SURNOM"), nickname, true)
            .addField(language("USERINFO_ID"), id, true)
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