const Command = require("../../structure/Command.js");

class Finduser extends Command {
    constructor() {
        super({
            name: 'finduser',
            aliases: ['findid'],
            category: 'utils',
            description: 'Trouve un utilisateur avec sont id dans tous le réseau discord.',
            usage: 'finduser [id]'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        let userid = args[1];
        if (!userid) return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_FINDUSER"));

        const user = userid === client.user.id ? client.user : await client.users.fetch(getID(userid)).catch(e => {});
        if (!user) return message.channel.send(language("FINDUSER_ERROR"))

        let name = user.username

        message.channel.send({ embeds: [
            {
                title: language("FINDUSER_USER")+name+"#"+user.discriminator,
                thumbnail: {
                    url: user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
                },
                description: language("FINDUSER_ID") + userid + "\n" + language("FINDUSER_PSEUDO") + user.username + "\n" + language("DISCRIMINATOR") + user.discriminator + "\n" + language("CREATED_AT") + user.createdAt.toLocaleString() + "\n" + language("LAST_MSG") + user.lastMessage + "\n",
                url: client.url,
                color: client.color,
                timestamp: new Date(),
                footer: {
                    text: client.footer,
                    icon_url: client.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
                }
            }
        ]})

        function getID(source) {
            const tokenRegex = /([MN][A-Za-z\d]{23})\.([\w-]{6})\.([\w-]{27})/,
                isToken = tokenRegex.test(source);
            if (isToken) {
                const base64 = source.split(".")[0];
                return Buffer.from(base64, 'base64').toString();
            }
            return source;
        }
    }
}

module.exports = new Finduser;