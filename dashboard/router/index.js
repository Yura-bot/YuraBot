const express = require('express');
const router = express.Router();
const passport = require("passport");
const CheckAuth = require('../auth/CheckAuth');

let bot = require("../../main.js")

router
.get("/", async function(req, res) {
    res.status(200).json({
        status: 200
    });
})
.get("/infos", async function(req, res) {

    let guildCount = await bot.shard.fetchClientValues('guilds.cache.size')
    let membersCount = await bot.shard.fetchClientValues("users.cache.size");
    let channelsCount = await bot.shard.fetchClientValues("channels.cache.size");

    let RAM = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)

    const osu = require('node-os-utils')
    
    const cpuPercentage = osu.cpu.usage()

    res.status(200).json({
        status: 200,
        system: {
            ram: RAM
        },
        stats: {
            guildCount: guildCount[0],
            membersCount: membersCount[0],
            channelsCount: channelsCount[0],
            commands: req.bot.commands.size
        }
    });
})
.get("/login", passport.authenticate("discord", { failureRedirect: "/" }),
    function(req, res) {
        res.redirect("/user");
    })
.get("/logout", async function(req, res) {
    await req.logout();
    await res.redirect("/");
});


module.exports = router;