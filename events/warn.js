module.exports = (client, info) => {
    client.hook.warn('**Bot Warn**', `Quelque chose s'est mal passé.`, `${info}`).catch(err => console.log(err.message));
}