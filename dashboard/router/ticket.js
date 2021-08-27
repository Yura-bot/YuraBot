const express = require('express');
const router = express.Router();
const CheckAuth = require('../auth/CheckAuth');

let bot = require("../../main.js")

router.get("/:guildID", CheckAuth, (req, res) => {

    //req.params.guildID
    //req.user.id

    let serv = req.bot.guilds.cache.get(req.params.guildID);
    if (!serv) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD") === false) return res.redirect("/");

    let guildSettingsExist = bot.guildSettings.has(`${req.params.guildID}`)
    let isTicket = bot.ticket.has(`${req.params.guildID}`)

    let prefix;
    let guildLanguage;

    if (guildSettingsExist) {
        prefix = bot.guildSettings.get(`${req.params.guildID}`, "prefix")
        guildLanguage = bot.guildSettings.get(`${req.params.guildID}`, "lang")
    } else {
        return res.redirect("/serveurs/"+req.params.guildID);
    }

    let channel = false
    let category = false
    let role = false

    if (isTicket) {
        channel = bot.ticket.get(`${req.params.guildID}`, "channel")
        category = bot.ticket.get(`${req.params.guildID}`, "category")
        role = bot.ticket.get(`${req.params.guildID}`, "role")
    }

    res.render("ticket", {
        name: (req.isAuthenticated() ? `${req.user.username}` : `Profil`),
        avatar: (req.isAuthenticated() ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : `https://image.noelshack.com/fichiers/2020/36/1/1598862029-disc.png`),
        status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "Se connecter"),
        botclient: req.client.user,
        bot: bot,
        user: req.user,
        login: "oui",
        guild: serv,
        avatarURL: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
        iconURL: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`,
        prefix: prefix,
        guildLanguage: guildLanguage,
        isTicket: isTicket,
        channel: channel,
        category: category,
        role: role,
        alert: false
    });
}).post("/:guildID", CheckAuth, async function(req, res) {

    let guild = req.bot.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (!req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect("/");

    const member = guild.members.cache.get(req.user.id);
    if (!member) return res.redirect("/");
    if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/");

    let guildSettingsExist = bot.guildSettings.has(`${req.params.guildID}`)
    let guildLanguage = bot.guildSettings.get(`${req.params.guildID}`, "lang")
    const language = require(`../../languages/${guildLanguage}`);

    let data  = req.body;
    let activate = data.statusTicket === "on";

    if (activate) {

        const Discord = require("discord.js");

        let embed = new Discord.MessageEmbed()
        .setTitle(language("TICKET_TITLE"))
        .setColor("#36393f")
        .setDescription(language("TICKET_DESC"));

        bot.channels.cache.get(guild.channels.cache.find((ch) => "#"+ch.name === data.channel).id).send({ embeds: [embed] })
        .then(m => {
          m.react('🎟');

          let obj = {
            category: guild.channels.cache.find((ch) => "#"+ch.name === data.category).id,
            channel: guild.channels.cache.find((ch) => "#"+ch.name === data.channel).id,
            role: guild.roles.cache.find((r) => "@"+r.name === data.role).id,
            message: m.id
          };

          bot.ticket.set(`${req.params.guildID}`, obj)

        })
        .catch(e => { member.send(language("TICKET_ERROR")).catch(e => {}) })

    } else {
        if (bot.ticket.has(`${req.params.guildID}`)) bot.ticket.delete(`${req.params.guildID}`)
        return res.redirect(`/ticket/${req.params.guildID}`);
    }

    res.redirect(`/ticket/${req.params.guildID}`);

})



module.exports = router;