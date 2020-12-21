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

    async run(client, message, args) {

        const Discord = require("discord.js");
        const backup = require("discord-backup");

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

        if(!message.member.hasPermission("ADMINISTRATOR")){
            return message.channel.send(language("MISSING_PERMISSION_ADMINISTRATOR"));
        }

        let backupID = args[1];
        if(!backupID){
            return message.channel.send(language("BACKUP_IDVALIDE"));
        }

        backup.fetch(backupID).then(async () => {

            message.channel.send(language("BACKUP_LOAD_CONFIRM"));
                await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "-confirm"), {
                    max: 1,
                    time: 20000,
                    errors: ["time"]
                }).catch((err) => {
                    return message.channel.send(language("BACKUP_LOAD_CONFIRM_CANCEL"));
                });

                message.author.send(language("BACKUP_LOAD_SUCESS")).catch(e => {});

                backup.load(backupID, message.guild).then(() => { backup.remove(backupID) }).catch((err) => {
                    return message.author.send(language("BACKUP_ERROR"));
                });

        }).catch((err) => {
            return message.channel.send(language("BACKUP_NO_FOUND")+backupID+"`!");
        });
    }
}

module.exports = new LoadBackup;