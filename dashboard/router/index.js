const express = require('express');
const router = express.Router();
const passport = require("passport");
const CheckAuth = require('../auth/CheckAuth');

let bot = require("../../main.js")

router.get("/", async function(req, res) {

    let guildCount = await bot.shard.fetchClientValues('guilds.cache.size')
    let membersCount = await bot.shard.fetchClientValues("users.cache.size");
    let channelsCount = await bot.shard.fetchClientValues("channels.cache.size");
    const reducer = (p, count) => p + count

        res.render("index.ejs", {
            username: (req.isAuthenticated() ? `${req.user.username}` : `User`),
            name: (req.isAuthenticated() ? `${req.user.username}` : `Profil`),
            avatar: (req.isAuthenticated() ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : `https://image.noelshack.com/fichiers/2020/36/1/1598862029-disc.png`),
            status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "Se connecter"),
            botclient: req.client.user,
            bot: bot,
            user: req.user,
            login: (req.isAuthenticated() ? "oui" : "non"),
            invite: `https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1`,
            message: "",
            messageType: "success",
            guildCount: guildCount.reduce(reducer),
            membersCount: membersCount.reduce(reducer),
            channelsCount: channelsCount.reduce(reducer),
        });
    })
    .get("/login", passport.authenticate("discord", { failureRedirect: "/" }),
        function(req, res) {
            res.redirect("/profile");
        })
    .get("/logout", async function(req, res) {
        await req.logout();
        await res.redirect("/");
    });


module.exports = router;