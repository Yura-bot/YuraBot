const express = require('express');
const router = express.Router();
const CheckAuth = require('../auth/CheckAuth');

let bot = require("../../main.js")
let config = require("../../configs/config.json")

router.get("/:guildID/ticket", CheckAuth, async(req, res) => {

    //req.params.guildID
    //req.user.id

    let serv = req.bot.guilds.cache.get(req.params.guildID);
    if (!serv) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (req.user.id != config.owner) {
        if (req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD") === false) return res.redirect("/");
    }

    let db = await bot.db.getGuild(req.params.guildID)
    
    let isTicket = db.tickets.enabled

    let channel = false
    let category = false
    let role = false

    if (isTicket) {
        channel = db.tickets.channel
        category = db.tickets.category
        role = db.tickets.role
    }

    res.render("extensions/ticket", {
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
        isTicket: isTicket,
        channel: channel,
        category: category,
        role: role,
        alert: false
    });
}).post("/:guildID/ticket", CheckAuth, async function(req, res) {

    let guild = req.bot.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (req.user.id != config.owner) {
        if (req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD") === false) return res.redirect("/");
    }

    let db = await bot.db.getGuild(req.params.guildID)

    let guildLanguage = db.lang
    const language = require(`../../languages/${guildLanguage}`);

    let data  = req.body;
    let activate = data.statusTicket === "on";

    if (activate) {

        const Discord = require("discord.js");

        let embed = new Discord.MessageEmbed()
        .setTitle(language("TICKET_TITLE"))
        .setColor("#36393f")
        .setDescription(language("TICKET_DESC"));

        let Tchannel = guild.channels.cache.find((ch) => "#"+ch.name === data.channel)

        guild.channels.cache.get(Tchannel.id).send(embed)
        .then(async m => {
          m.react('🎟');

          let obj = {
            enabled: true,
            category: guild.channels.cache.find((ch) => "#"+ch.name === data.category),
            channel: Tchannel.id,
            role: guild.roles.cache.find((r) => "@"+r.name === data.role),
            message: m.id
          };

          db.tickets = obj
          db.markModified("tickets");
          await db.save();

        })
        .catch(e => { member.send(language("TICKET_ERROR")).catch(e => {}) })

    } else {
        db.tickets.enabled = false
        db.markModified("tickets");
        await db.save();
    }

    res.redirect(`/extensions/${req.params.guildID}/ticket`);
}).get("/:guildID/backup", CheckAuth, async(req, res) => {

    //req.params.guildID
    //req.user.id

    let serv = req.bot.guilds.cache.get(req.params.guildID);
    if (!serv) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (req.user.id != config.owner) {
        if (req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD") === false) return res.redirect("/");
    }

    let db = await bot.db.getGuild(req.params.guildID)

    res.render("extensions/backup", {
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
        create: false,
        alert: false,
        sucess: false
    });
}).post("/:guildID/backup", CheckAuth, async function(req, res) {

    let guild = req.bot.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (req.user.id != config.owner) {
        if (req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD") === false) return res.redirect("/");
    }

    let db = await bot.db.getGuild(req.params.guildID)

    const backup = require("discord-backup")

    let guildLanguage = db.lang
    const language = require(`../../languages/${guildLanguage}`);

    let data  = req.body;

    if(Object.prototype.hasOwnProperty.call(data, "create")){
        backup.create(guild, {
            maxMessagesPerChannel: 0,
            jsonBeautify: true
        }).then((backupData) => {

            return res.render("extensions/backup", {
                name: (req.isAuthenticated() ? `${req.user.username}` : `Profil`),
                avatar: (req.isAuthenticated() ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : `https://image.noelshack.com/fichiers/2020/36/1/1598862029-disc.png`),
                status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "Se connecter"),
                botclient: req.client.user,
                bot: bot,
                user: req.user,
                login: "oui",
                guild: guild,
                avatarURL: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
                iconURL: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`,
                create: true,
                createID: backupData.id,
                alert: false,
                sucess: false
            });
        });
    }

    if(Object.prototype.hasOwnProperty.call(data, "load")){
        let backupID = data.LOADID

        backup.fetch(backupID).then(async () => {

            member.send(language("BACKUP_LOAD_SUCESS")).catch(e => {});

            backup.load(backupID, guild).then(() => { backup.remove(backupID) }).catch((err) => {
                return member.send(language("BACKUP_ERROR"));
            });
            return res.render("extensions/backup", {
                name: (req.isAuthenticated() ? `${req.user.username}` : `Profil`),
                avatar: (req.isAuthenticated() ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : `https://image.noelshack.com/fichiers/2020/36/1/1598862029-disc.png`),
                status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "Se connecter"),
                botclient: req.client.user,
                bot: bot,
                user: req.user,
                login: "oui",
                guild: guild,
                avatarURL: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
                iconURL: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`,
                create: false,
                alert: false,
                sucess: true
            });

    }).catch((err) => {
        return res.render("extensions/backup", {
            name: (req.isAuthenticated() ? `${req.user.username}` : `Profil`),
            avatar: (req.isAuthenticated() ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : `https://image.noelshack.com/fichiers/2020/36/1/1598862029-disc.png`),
            status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "Se connecter"),
            botclient: req.client.user,
            bot: bot,
            user: req.user,
            login: "oui",
            guild: guild,
            avatarURL: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
            iconURL: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`,
            create: false,
            alert: true,
            sucess: false
        });
    });
    }
})

module.exports = router;