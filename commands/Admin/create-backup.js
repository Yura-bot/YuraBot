const Command = require("../../structure/Command.js");

class CreateBackup extends Command {
    constructor() {
        super({
            name: 'create-backup',
            aliases: ['c-b'],
            category: 'admin',
            description: 'Permet de crée une backup de votre serveur.',
            usage: 'create-backup'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");
        const backup = require("discord-backup")

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if(!message.member.permissions.has("ADMINISTRATOR")){
            return message.channel.send(language("MISSING_PERMISSION_ADMINISTRATOR"));
        }

        message.channel.send(language("LOADING")).then(m => {

            backup.create(message.guild, {
                maxMessagesPerChannel: 0,
                jsonBeautify: true
            }).then((backupData) => {
                message.author.send(language("BACKUP_COMMAND")+prefix+"load-backup "+backupData.id+"`!").catch(e => {
                    message.channel.send(language("BACKUP_COMMAND")+prefix+"load-backup "+backupData.id+"`!")
                })
                m.edit(language("BACKUP_SAVE")).catch(e => {
                    client.emit('error',e, "backup-create");
                });
            });

        }).catch(e => {
            return client.emit('error',e, "backup-create");
        });
    }
}

module.exports = new CreateBackup;