const Command = require("../../structure/Command.js");

class UnMute extends Command {
    constructor() {
        super({
            name: 'unmute',
            aliases: [],
            category: 'mod',
            description: "Permet d'enlever le mode muet une personne",
            usage: 'unmute [Membre]'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if (!message.member.permissions.has("MUTE_MEMBERS")) {
            const error_permissions = new Discord.MessageEmbed()
                .setDescription(language("MISSING_PERMISSION_MUTE_MEMBERS"))
                .setColor("#F43436")
            return message.channel.send({ embeds: [message.channel.send(error_permissions)] })
        }

        if (!message.guild.me.permissions.has("MANAGE_ROLES")) {
            return message.channel.send(language("BOT_PERMISSION_MANAGE_ROLES"));
        }

        const usermute = message.mentions.users.first() || await message.guild.members.fetch(args[1]);
        const guildMember = await message.guild.members.fetch(usermute)

        if (!guildMember) {
            return message.channel.send(
              language("SYNTAXE") + prefix + language("SYNTAXE_UNMUTE")
            );
        }

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

        if(guildMember.roles.cache.has(muterole.id) === false) {
            return message.channel.send(language("UNMUTE_NOMUTE"))
        }

        guildMember.roles.remove(muterole).catch(e =>{
            message.channel.send(language("UNMUTE_ERROR"))
            return client.emit('error',e, "unmute");
        });
          
        await message.channel.send(language("UNMUTE_SUCESS").replace("{usermute}", usermute))
        
        usermute.send(language("UNMUTE_SENDUSER").replace("{guild}", message.guild.name)).catch(e =>{
            message.channel.send(language("MUTE_SUCESS_MPCLOSE"))
        });
    }
}

module.exports = new UnMute;