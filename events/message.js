const Config = require('../configs/config.json');

module.exports = (client, message) => {

    if(message.author.bot || !message.channel.guild) return;

    let guildSettingsExist = client.guildSettings.has(`${message.guild.id}`)
    let prefix;
    if (guildSettingsExist) {
        prefix = client.guildSettings.get(`${message.guild.id}`, "prefix")
    } else {
        prefix = client.default_prefix;
    }

    if(message.content.includes(`<@${client.user.id}>`)) {
     message.channel.send("Hello!")
     prefix = `<@${client.user.id}> `
    }

    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = client.commands.find(cmd => cmd.aliases.includes(args[0])) || client.commands.get(args[0]);
    if(!command) return;

    if(command.permission !== 'everyone') {
        if(!message.member.hasPermission(command.permission)) {
            return message.channel.send(client.snippet.insufficientPermissions(message.author));
        }
    }

    if(command.category === 'secret') {
        if(message.member.id != "477582590329749504") return;
    }

    try { command.run(client, message, args) }
    catch (e) { client.emit('error',e); }
};