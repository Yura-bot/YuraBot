module.exports = (client, e, cmd) => {
    client.hook.error('**Bot error**', `Quelque chose s'est mal passé commande : **${cmd}**`, `${e}`).catch(err => console.log(err.message));
}