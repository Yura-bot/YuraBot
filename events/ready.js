module.exports = async(client) => {
    console.log("» "+client.user.username+" est prêt, connécté en tant que "+client.user.tag+".");
    await client.dash.load(client);
}