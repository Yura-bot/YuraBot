const express = require('express');
const router = express.Router();
const CheckAuth = require('../auth/CheckAuth');

let bot = require("../../main.js")

router.get('/', CheckAuth, async(req, res) => {

    let tag = req.user.username + "#" + req.user.discriminator

    let db = await bot.db.getUserTag(tag)
    let points;

    if (db != false) { 
        points = db.points
    } else {
        points = 0
    }

    res.render("profile", {
        guilds: req.user.guilds.filter(u => (u.permissions & 2146958591) === 2146958591),
        name: (req.isAuthenticated() ? `${req.user.username}` : `Profil`),
        avatar: (req.isAuthenticated() ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : `https://image.noelshack.com/fichiers/2020/36/1/1598862029-disc.png`),
        status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "Se connecter"),
        botclient: req.client.user,
        bot: bot,
        user: req.user,
        login: "oui",
        invite: `https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1`,
        message: "",
        messageType: "success",
        points: points
    });
});

module.exports = router;