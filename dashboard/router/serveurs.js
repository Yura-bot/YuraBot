const express = require('express');
const router = express.Router();
const CheckAuth = require('../auth/CheckAuth');

router.get("/:guildID", CheckAuth, (req, res) => {

    console.log(req.params)
    console.log(req.user.id)

    let serv = req.bot.guilds.cache.get(req.params.guildID);
    if (!serv) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (!req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect("/dashboard");

    res.render("guild", {
        status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "Se connecter"),
        botclient: req.bot.user,
        user: req.user,
        login: "oui",
        guild: serv,
        avatarURL: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
        iconURL: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`,
        message: "",
        messageType: "success"
    });
})

module.exports = router;