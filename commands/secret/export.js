const Command = require("../../structure/Command.js");

class Export extends Command {
    constructor() {
        super({
            name: 'export',
            aliases: [''],
            category: 'secret',
            description: '',
            usage: ''
        });
    }

    async run(client, message, args) {

        const Discord = require("discord.js");
        const hastebin = require('hastebin-gen');

        const haste = client.guildSettings.export();
        hastebin(haste).then(r => {
    
            message.channel.send("`Guilds Settings :`  " + r);
    
        }).catch(e => {
            return message.channel.send(`<:X_:673212163837526064> **Erreur :**\n${e}`);
        });
    
        message.delete();

    }
}

module.exports = new Export;