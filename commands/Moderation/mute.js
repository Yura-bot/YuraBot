const Command = require("../../structure/Command.js");

class Mute extends Command {
    constructor() {
        super({
            name: 'mute',
            aliases: [],
            category: 'mod',
            description: 'Permet de rendre muet une personne',
            usage: 'mute [Membre] (Raison)'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if (!message.member.permissions.has("MANAGE_ROLES")) {
            var error_permissions = new Discord.MessageEmbed()
                .setDescription(language("MISSING_PERMISSION_MANAGE_ROLES"))
                .setColor("#F43436")
            return message.channel.send(error_permissions)
        }

        if (!message.guild.me.permissions.has("MANAGE_ROLES")) {
            return message.channel.send(language("BOT_PERMISSION_MANAGE_ROLES"));
        }

        const usermute = message.mentions.users.first() || await message.guild.members.fetch(args[1]);
        const guildMember = await message.guild.members.fetch(usermute)

        if (!guildMember) {
            return message.channel.send(
              language("SYNTAXE") + prefix + language("SYNTAXE_MUTE")
            );
        }

        if(guildMember.id === message.author.id) {
            return message.channel.send(language("AUTOMUTE"));
        }

        let reason = args.slice(2).join(' ');
        if (reason.length < 1) reason = language("BAN_NO_REASON");

        let muterole = db.muteRole

        if (message.guild.roles.cache.has(muterole)) {
            muterole = message.guild.roles.cache.get(muterole);
        } else {
            muterole = message.guild.roles.cache.find(x => x.name === "Muted")

            if(!muterole) {
                try {
                    muterole = await message.guild.roles.create({
                        data: {
                          name: 'Muted',
                          color: '#070707',
                        },
                        reason: 'Création du role de mute.',
                      })          
            
                    message.guild.channels.cache.forEach(async (channel, id) => {
                        await channel.createOverwrite(muterole, {
                            SEND_MESSAGES: false,
                            MANAGE_MESSAGES: false,
                            READ_MESSAGES: false,
                            ADD_REACTIONS: false
                        });
                    });
                } catch(e) {
                    message.channel.send(language("MUTE_ERROR"))
                    return client.emit('error',e, "mute");
                }
            }
        }

        if(guildMember.roles.cache.has(muterole.id)) {
            return message.channel.send(language("USERMUTE"))
        }

        guildMember.roles.add(muterole).catch(e =>{
            message.channel.send(language("MUTE_ERROR"))
            return client.emit('error',e, "mute");
        });

        const embed = new Discord.MessageEmbed()
        .setColor(0xFF0000)
        .setTimestamp()
        .addField(language("MOD_ACTION"), 'Mute')
        .addField(language("MOD_MEMBER"), `${usermute} (${usermute.id})`)
        .addField(language("MOD_MODERATOR"), `${message.author.username}#${message.author.discriminator}`)
        .addField(language("MOD_REASON"), reason)
        .setFooter(client.footer);

        message.channel.send({ embeds: [embed] });

        db.muteRole = muterole.id,
        await db.save();
            
        usermute.send(language("MUTE_SUCESS_MP").replace("${server}", message.guild.name).replace("${mod}", message.author.username).replace("${reason}", reason)).catch(e =>{
            message.channel.send(language("MUTE_SUCESS_MPCLOSE"))
        });
    }
}

module.exports = new Mute;