const Command = require("../../structure/Command.js");

class TempMute extends Command {
    constructor() {
        super({
            name: 'tempmute',
            aliases: [],
            category: 'mod',
            description: 'Permet de rendre muet une personne dans un temps limité.',
            usage: 'tempmute [Membre] [Temps] (Raison)'
        });
    }

    async run(client, message, args) {

        const Discord = require("discord.js");
        const ms = require("ms");

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

        if (!message.member.hasPermission("MANAGE_ROLES")) {
            var error_permissions = new Discord.MessageEmbed()
                .setDescription(language("MISSING_PERMISSION_MANAGE_ROLES"))
                .setColor("#F43436")
            return message.channel.send(error_permissions)
        }

        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send(language("BOT_PERMISSION_MANAGE_ROLES"));
        }

        const usermute = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[1]);

        if (!usermute) {
            return message.channel.send(
              language("SYNTAXE") + prefix + language("SYNTAXE_TEMPMUTE")
            );
        }

        if(usermute.id === message.author.id) {
            return message.channel.send(language("AUTOMUTE"));
        }

        let mutetime = args[2];
        if(!mutetime) return message.reply(language("SYNTAXE") + prefix + language("SYNTAXE_TEMPMUTE"));

        let reason = args.slice(3).join(' ');
        if (reason.length < 1) reason = language("BAN_NO_REASON");

        let muterole = message.guild.roles.cache.find(x => x.name === "Muted")

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
        if(usermute.roles.cache.has(muterole)) {
            return message.channel.send(language("USERMUTE"))
        }

        usermute.roles.add(muterole).catch(e =>{
            message.channel.send(language("MUTE_ERROR"))
            return client.emit('error',e, "mute");
        });

        const embed = new Discord.MessageEmbed()
        .setColor(0xFF0000)
        .setTimestamp()
        .addField(language("MOD_ACTION"), 'TempMute')
        .addField(language("MOD_MEMBER"), `${usermute} (${usermute.id})`)
        .addField(language("MOD_MODERATOR"), `${message.author.username}#${message.author.discriminator}`)
        .addField(language("MOD_REASON"), reason)
        .addField(language("MOD_TIME"), ms(ms(mutetime)))
        .setFooter(client.footer);

        message.channel.send(embed);
            
        usermute.send(`${language("TEMPMUTE_SUCESS_MP_1")}${message.guild.name}${language("TEMPMUTE_SUCESS_MP_2")}${message.author.username}${language("TEMPMUTE_SUCESS_MP_3")}` + ms(ms(mutetime)) + " ! " + `${language("TEMPMUTE_SUCESS_MP_4")}\`${reason}\``).catch(e =>{
            message.channel.send(language("TEMPMUTE_SUCESS_MPCLOSE"))
        });

        setTimeout(function(){

            if(usermute.roles.cache.has(muterole.id) === false) {
                return; 
            }
            
            message.guild.member(usermute).roles.remove(muterole).catch(e =>{
                message.channel.send(language("UNMUTE_ERROR"))
                return client.emit('error',e, "unmute");
            });
            
            message.channel.send(`${language("TEMPMUTE_UNMUTE_CHANNEL_1")}${usermute.id}${language("TEMPMUTE_UNMUTE_CHANNEL_2")}`).catch(e => {});
            message.mentions.users.first().send(`${language("TEMPMUTE_UNMUTE_MP_1")}${message.guild.name}${language("TEMPMUTE_UNMUTE_MP_2")}`).catch(e => {});
        
        }, ms(mutetime));
    }
}

module.exports = new TempMute;