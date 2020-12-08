const express = require('express');
const router = express.Router();
const CheckAuth = require('../auth/CheckAuth');

let bot = require("../../main.js")

router.get("/:guildID", CheckAuth, (req, res) => {

    //req.params.guildID
    //req.user.id

    let serv = req.bot.guilds.cache.get(req.params.guildID);
    if (!serv) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (!req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect("/");

    let guildSettingsExist = bot.guildSettings.has(`${req.params.guildID}`)

    let obj = {
        prefix: "?",
        lang: "french",
    }
    let prefix;
    let guildLanguage;
    let language2;

    if (guildSettingsExist) {
        prefix = bot.guildSettings.get(`${req.params.guildID}`, "prefix")
        guildLanguage = bot.guildSettings.get(`${req.params.guildID}`, "lang")
    } else {
        bot.guildSettings.set(`${req.params.guildID}`, obj)
        return res.redirect("/serveurs/"+req.params.guildID);
    }

    if (guildLanguage === "english") { 
        guildLanguage = "Anglais"
        language2 = "Français" 
    } else  { 
        guildLanguage = "Français"
        language2 = "Anglais" 
    }

    res.render("guild", {
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
        message: "",
        messageType: "success",
        prefix: prefix,
        guildLanguage: guildLanguage,
        language2: language2,
        alert: false
    });
}).post("/:guildID", CheckAuth, async function(req, res) {

    let guild = req.bot.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (!req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect("/");

    let guildSettingsExist = bot.guildSettings.has(`${req.params.guildID}`)

    let obj = {
        prefix: "?",
        lang: "french",
    }
    let prefix;
    let guildLanguage;
    let language2;

    if (guildSettingsExist) {
        prefix = bot.guildSettings.get(`${req.params.guildID}`, "prefix")
        guildLanguage = bot.guildSettings.get(`${req.params.guildID}`, "lang")
    } else {
        bot.guildSettings.set(`${req.params.guildID}`, obj)
        return res.redirect("/serveurs/"+req.params.guildID);
    }

    if (guildLanguage === "english") { 
        guildLanguage = "Anglais"
        language2 = "Français" 
    } else  { 
        guildLanguage = "Français"
        language2 = "Anglais" 
    }

    const member = guild.members.cache.get(req.user.id);
    if (!member) return res.redirect("/");
    if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/");

    let data  = req.body;

    //Prefix :
    if(data.prefix.length > 3) {
        return;
    }
    await bot.guildSettings.set(`${req.params.guildID}`, data.prefix, "prefix")

    // Lang : 
    let language = data.language.toLowerCase();

    if (language === "anglais") {
        language = "english"
    } else if (language === "français") {
        language = "french"
    } else {
        return;
    }
    await bot.guildSettings.set(`${req.params.guildID}`, language, "lang")

    res.render("guild", {
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
        message: "",
        messageType: "success",
        prefix: prefix,
        guildLanguage: guildLanguage,
        language2: language2,
        alert: true
    });

}).get("/:guildID/tools/welcome", CheckAuth, async(req, res) => {

    let serv = req.bot.guilds.cache.get(req.params.guildID);
    if (!serv) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (!req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect("/");

    let guildSettingsExist = bot.guildSettings.has(`${req.params.guildID}`)

    if (guildSettingsExist === false ) {
        return res.redirect("/serveurs/"+req.params.guildID);
    }

    let welcomeEnabled = bot.guildSettings.has(`${req.params.guildID}`, "welcomePlug")

    let welcomeChannel; 
    let welcomeMessage;
    let welcomeImage;

    if (welcomeEnabled) {
        welcomeChannel = bot.guildSettings.get(`${req.params.guildID}`, "welcomePlug.welcomeChannel")
        welcomeMessage = bot.guildSettings.get(`${req.params.guildID}`, "welcomePlug.welcomeMessage")
        welcomeImage = bot.guildSettings.get(`${req.params.guildID}`, "welcomePlug.welcomeImage")
    }

    res.render("items/welcome", {
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
        message: "",
        messageType: "success",
        welcomeChannel: welcomeChannel,
        welcomeMessage: welcomeMessage,
        welcomeEnabled: welcomeEnabled,
        welcomeImage: welcomeImage,
        alert: false
    });
}).post("/:guildID/tools/welcome", CheckAuth, async function(req, res) {

    let guild = req.bot.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (!req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect("/");

    const member = guild.members.cache.get(req.user.id);
    if (!member) return res.redirect("/");
    if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/");

    let welcomeEnabled = bot.guildSettings.has(`${req.params.guildID}`, "welcomePlug")

    let welcomeChannel; 
    let welcomeMessage;
    let welcomeImage;

    if (welcomeEnabled) {
        welcomeChannel = bot.guildSettings.get(`${req.params.guildID}`, "welcomePlug.welcomeChannel")
        welcomeMessage = bot.guildSettings.get(`${req.params.guildID}`, "welcomePlug.welcomeMessage")
        welcomeImage = bot.guildSettings.get(`${req.params.guildID}`, "welcomePlug.welcomeImage")
    }

    let data  = req.body;

    //Status :
    let statusWelcome = data.statusWelcome;

    if (statusWelcome != "on") {
        bot.guildSettings.delete(`${req.params.guildID}`, "welcomePlug")
        return res.redirect("/serveurs/"+req.params.guildID+"/tools/welcome");
    }

    // Channel : 
    let welcomeChannelConfig = guild.channels.cache.find((ch) => "#"+ch.name === data.channelID).id;
    //Message
    let welcomeMessageConfig = data.welcomeMessage;
    //Image ?
    let welcomeImageConfig = data.withImage === "on"

    const obj = {
        welcomePlug: {
            welcomeChannel: welcomeChannelConfig,
            welcomeMessage: welcomeMessageConfig,
            welcomeImage: welcomeImageConfig,
            welcomeImageURL: "URL",
        }
    }
    await bot.guildSettings.update(`${req.params.guildID}`, obj)

    welcomeChannel = bot.guildSettings.get(`${req.params.guildID}`, "welcomePlug.welcomeChannel")
    welcomeMessage = bot.guildSettings.get(`${req.params.guildID}`, "welcomePlug.welcomeMessage")
    welcomeImage = bot.guildSettings.get(`${req.params.guildID}`, "welcomePlug.welcomeImage")
    welcomeEnabled = bot.guildSettings.has(`${req.params.guildID}`, "welcomePlug")

    res.render("items/welcome", {
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
        message: "",
        messageType: "success",
        welcomeChannel: welcomeChannel,
        welcomeMessage: welcomeMessage,
        welcomeEnabled: welcomeEnabled,
        welcomeImage: welcomeImage,
        alert: true
    });

}).get("/:guildID/tools/goodbye", CheckAuth, async(req, res) => {

    let serv = req.bot.guilds.cache.get(req.params.guildID);
    if (!serv) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (!req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect("/");

    let guildSettingsExist = bot.guildSettings.has(`${req.params.guildID}`)

    if (guildSettingsExist === false ) {
        return res.redirect("/serveurs/"+req.params.guildID);
    }

    let goodbyeEnabled = bot.guildSettings.has(`${req.params.guildID}`, "goodbyePlug")

    let goodbyeChannel; 
    let goodbyeMessage;
    let goodbyeImage;

    if (goodbyeEnabled) {
        goodbyeChannel = bot.guildSettings.get(`${req.params.guildID}`, "goodbyePlug.goodbyeChannel")
        goodbyeMessage = bot.guildSettings.get(`${req.params.guildID}`, "goodbyePlug.goodbyeMessage")
        goodbyeImage = bot.guildSettings.get(`${req.params.guildID}`, "goodbyePlug.goodbyeImage")
    }

    res.render("items/goodbye", {
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
        message: "",
        messageType: "success",
        goodbyeChannel: goodbyeChannel,
        goodbyeMessage: goodbyeMessage,
        goodbyeEnabled: goodbyeEnabled,
        goodbyeImage: goodbyeImage,
        alert: false
    });   
}).post("/:guildID/tools/goodbye", CheckAuth, async function(req, res) {

    let guild = req.bot.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (!req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect("/");

    const member = guild.members.cache.get(req.user.id);
    if (!member) return res.redirect("/");
    if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/");

    let goodbyeEnabled = bot.guildSettings.has(`${req.params.guildID}`, "goodbyePlug")

    let goodbyeChannel; 
    let goodbyeMessage;
    let goodbyeImage;

    if (goodbyeEnabled) {
        goodbyeChannel = bot.guildSettings.get(`${req.params.guildID}`, "goodbyePlug.goodbyeChannel")
        goodbyeMessage = bot.guildSettings.get(`${req.params.guildID}`, "goodbyePlug.goodbyeMessage")
        goodbyeImage = bot.guildSettings.get(`${req.params.guildID}`, "goodbyePlug.goodbyeImage")
    }

    let data  = req.body;

    //Status :
    let statusGoodbye = data.statusGoodbye;

    if (statusGoodbye != "on") {
        bot.guildSettings.delete(`${req.params.guildID}`, "goodbyePlug")
        return res.redirect("/serveurs/"+req.params.guildID+"/tools/goodbye");
    }

    // Channel : 
    let goodbyeChannelConfig = guild.channels.cache.find((ch) => "#"+ch.name === data.channelID).id;
    //Message
    let goodbyeMessageConfig = data.goodbyeMessage;
    //Image ?
    let goodbyeImageConfig = data.withImage === "on"

    const obj = {
        goodbyePlug: {
            goodbyeChannel: goodbyeChannelConfig,
            goodbyeMessage: goodbyeMessageConfig,
            goodbyeImage: goodbyeImageConfig,
            goodbyeImageURL: "URL",
        }
    }
    await bot.guildSettings.update(`${req.params.guildID}`, obj)

    goodbyeChannel = bot.guildSettings.get(`${req.params.guildID}`, "goodbyePlug.goodbyeChannel")
    goodbyeMessage = bot.guildSettings.get(`${req.params.guildID}`, "goodbyePlug.goodbyeMessage")
    goodbyeImage = bot.guildSettings.get(`${req.params.guildID}`, "goodbyePlug.goodbyeImage")
    goodbyeEnabled = bot.guildSettings.has(`${req.params.guildID}`, "goodbyePlug")

    res.render("items/goodbye", {
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
        message: "",
        messageType: "success",
        goodbyeChannel: goodbyeChannel,
        goodbyeMessage: goodbyeMessage,
        goodbyeEnabled: goodbyeEnabled,
        goodbyeImage: goodbyeImage,
        alert: true
    });

})



module.exports = router;