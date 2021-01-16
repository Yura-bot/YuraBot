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

        const Discord = require("discord.js");
        const ms = require('ms');

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.channel.send(language("MISSING_PERMISSION_MANAGE_MESSAGES"));
        }

        let dropPrize = args.slice(1).join(' ');

        if(!dropPrize){
            return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_DROP"));
        }
        
        const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setColor("#D8FF00")
        .setTitle("🎁 » __**DROP**__")
        .setDescription(`${language("DROP_DESC_1", message.author)} ⋄ **${message.author.tag}** \n${language("DROP_DESC_2", dropPrize)}`)

        message.channel.send({ embed }).then(async msg => {
            msg.react("🎊");
    
            const filter = (reaction, user) => {
                if(user.bot) return;
                return reaction.emoji.name === "🎊" && user.id !== message.author.id;
            };
    
            const collector = msg.createReactionCollector(filter, { max: 1 });
    
            collector.on("collect", async () => {
                const winEmbed = new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setColor("#D8FF00")
                    .setTitle("🎁 » __**DROP**__")
                    .setDescription(`${language("DROP_WIN_DESC_1", dropPrize)}${language("DROP_WIN_DESC_2", msg.reactions.cache.first().users.cache.filter(u => !u.bot && u.id !== message.author.id).first().id)} ⋄ **${msg.reactions.cache.first().users.cache.filter(u => !u.bot && u.id !== message.author.id).first().tag}**`)
    
                msg.edit({ embed: winEmbed });
            });
        });
    }
}

module.exports = new Drop;