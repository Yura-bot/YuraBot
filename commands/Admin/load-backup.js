const Command = require("../../structure/Command.js");

class LoadBackup extends Command {
    constructor() {
        super({
            name: 'load-backup',
            aliases: ['l-b'],
            category: 'admin',
            description: 'Permet de mettre une backup de votre serveur.',
            usage: 'load-backup [ID]'
        });
    }

    async run(client, message, args, db) {

        const Discord = require("discord.js");
        const backup = require("discord-backup")

        let prefix = !db.prefix ? config.prefix : db.prefix;
        let guildLanguage = !db.lang ? "english": db.lang;

        const language = require(`../../languages/${guildLanguage}`);

        if(!message.member.hasPermission("ADMINISTRATOR")){
            return message.channel.send(language("MISSING_PERMISSION_ADMINISTRATOR"));
        }

        let backupID = args[1];
        if(!backupID){
            return message.channel.send(language("BACKUP_IDVALIDE"));
        }

        backup.fetch(backupID).then(() => {

            message.channel.send(language("BACKUP_LOAD_CONFIRM"));
    
            const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && ['-confirm', 'cancel'].includes(m.content), {
                time: 60000,
                max: 1
            });

            collector.on('collect', (m) => {

                const confirm = m.content === '-confirm';
                collector.stop();

                if (confirm) {     

                    backup.load(backupID, message.guild).then(() => { backup.remove(backupID) }).catch((err) => {
                        return message.author.send(language("BACKUP_ERROR"));
                    });
    
                } else {
                    return message.channel.send(language("BACKUP_LOAD_CONFIRM_CANCEL"));
                }
            })
    
            collector.on('end', (collected, reason) => {
                if (reason === 'time')
                    return message.channel.send(language("BACKUP_LOAD_CONFIRM_CANCEL"));
            })
    
        }).catch((err) => {
            return message.channel.send(language("BACKUP_NO_FOUND")+backupID+"`!");
        });
    }
}

module.exports = new LoadBackup;