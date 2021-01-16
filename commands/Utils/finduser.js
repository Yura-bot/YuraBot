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

        let status = user.presence.status;
        if (status === "dnd") {
            status = language("DND")
        }
        if (status === "idle") {
            status = language("IDLE")
        }
        if (status === "online") {
            status = language("UONLINE")
        }
        if (status === "offline") {
            status = language("UOFFLINE")
        }

        message.channel.send({
            embed: {
                title: ":pushpin: Utilisateur : "+name+"#"+user.discriminator,
                thumbnail: {
                    url: user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
                },
                description: "🔧 » ID : " + userid + "\n" + "🧐 » Pseudo : " + user.username + "\n" + language("DISCRIMINATOR") + user.discriminator + "\n" + ":high_brightness: » Statut : " + status + "\n" + language("CREATED_AT") + user.createdAt.toLocaleString() + "\n" + language("LAST_MSG") + user.lastMessage + "\n",
                url: client.url,
                color: client.color,
                timestamp: new Date(),
                footer: {
                    text: client.footer,
                    icon_url: user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
                }
            }
        })

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