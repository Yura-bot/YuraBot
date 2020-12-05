const express = require('express');
const router = express.Router();
const CheckAuth = require('../auth/CheckAuth');
const path = require("path");

let bot = require("../../main.js")

const dataDir = path.resolve(`${process.cwd()}${path.sep}dashboard`); // The absolute path of current this directory.
const templateDir = path.resolve(`${dataDir}${path.sep}views`);

const renderTemplate = (res, req, template, data = {}) => {

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
        prefix = bot.default_prefix;
        guildLanguage = "english"
    }

    if (guildLanguage === "english") { 
        guildLanguage = "Anglais"
        language2 = "Français" 
    } else  { 
        guildLanguage = "Français"
        language2 = "Anglais" 
    }

    const baseData = {
        bot: bot,
        path: req.path,
        name: (req.isAuthenticated() ? `${req.user.username}` : `Profil`),
        avatar: (req.isAuthenticated() ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : `https://image.noelshack.com/fichiers/2020/36/1/1598862029-disc.png`),
        status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "Se connecter"),
        user: req.isAuthenticated() ? req.user : null,
        prefix: prefix,
        guildLanguage: guildLanguage,
        language2: language2
    };
    
    res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
};

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
        prefix = bot.default_prefix;
        guildLanguage = "english"
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
        language2: language2
    });
}).post("/:guildID", CheckAuth, async function(req, res) {

    let guild = req.bot.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (!req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect("/");

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

    renderTemplate(res, req, "guild.ejs", { guild, alert: "Your settings have been saved." });

}).get("/:guildID/tools/welcome", CheckAuth, async(req, res) => {

    let serv = req.bot.guilds.cache.get(req.params.guildID);
    if (!serv) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (!req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect("/");

    let guildSettingsExist = bot.guildSettings.has(`${req.params.guildID}`)

    if (guildSettingsExist === false ) {
        return res.redirect("/:guildID");
    }

    let welcomeEnabled = bot.guildSettings.has(`${req.params.guildID}`, "welcomeMessage")

    let obj = {
        welcomeChannel: "",
        welcomeMessage: "Hello!",
        welcomeImage: false,
        welcomeImageURL: "",
    }

    let welcomeChannel; 
    let welcomeMessage;
    let welcomeImage;

    if (welcomeEnabled === false ) {
        await bot.guildSettings.update(`${req.params.guildID}`, obj)
        return res.redirect("/");
    } else {
        welcomeChannel = bot.guildSettings.get(`${req.params.guildID}`, "welcomeChannel")
        welcomeMessage = bot.guildSettings.get(`${req.params.guildID}`, "welcomeMessage")
        welcomeImage = bot.guildSettings.get(`${req.params.guildID}`, "welcomeImage")
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
        welcomeImage: welcomeImage
    });

    

}).post("/:guildID/tools/welcome", CheckAuth, async function(req, res) {

    let guild = req.bot.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (!req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect("/");

    const member = guild.members.cache.get(req.user.id);
    if (!member) return res.redirect("/");
    if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/");

    let data  = req.body;

    // Channel : 
    let welcomeChannel = guild.channels.cache.find((ch) => "#"+ch.name === data.channelID).id;
    bot.guildSettings.set(`${req.params.guildID}`, welcomeChannel, "welcomeChannel")

    //Message
    let welcomeMessage = data.welcomeMessage;
    bot.guildSettings.set(`${req.params.guildID}`, welcomeMessage, "welcomeMessage")

    //Image ?

    let welcomeImage = data.withImage === "on"
    bot.guildSettings.set(`${req.params.guildID}`, welcomeImage, "welcomeImage")

    renderTemplate(res, req, "guild.ejs", { guild, alert: "Your settings have been saved." });

})



module.exports = router;