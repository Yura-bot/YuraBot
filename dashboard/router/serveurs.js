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
    };

    let prefix;
    let guildLanguage;
    let language2;

    let suggestionEnabled;
    let suggestionChannel;

    if (guildSettingsExist) {
        prefix = bot.guildSettings.get(`${req.params.guildID}`, "prefix")
        guildLanguage = bot.guildSettings.get(`${req.params.guildID}`, "lang")

        suggestionEnabled = bot.guildSettings.has(`${req.params.guildID}`, "suggestionPlug")

        if (suggestionEnabled) {
            suggestionChannel = bot.guildSettings.get(`${req.params.guildID}`, "suggestionPlug.channel")
        }
        
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
        suggestionEnabled: suggestionEnabled,
        suggestionChannel: suggestionChannel,
        alert: false
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

    //Suggestion System :
    let suggestionEnabled = data.suggestionStatus === "on";
    let suggestionChannel = guild.channels.cache.find((ch) => "#"+ch.name === data.suggestionChannelID).id;

    
    if (suggestionEnabled) {
        await bot.guildSettings.set(`${req.params.guildID}`, suggestionChannel, "suggestionPlug.channel")
    } else {
        bot.guildSettings.delete(`${req.params.guildID}`, "suggestionPlug")
    }

    //re-save :

    let prefix = bot.guildSettings.get(`${req.params.guildID}`, "prefix");
    let guildLanguage = bot.guildSettings.get(`${req.params.guildID}`, "lang");
    let language2;

    if (guildLanguage === "english") { 
        guildLanguage = "Anglais"
        language2 = "Français" 
    } else  { 
        guildLanguage = "Français"
        language2 = "Anglais" 
    }

    suggestionEnabled = bot.guildSettings.has(`${req.params.guildID}`, "suggestionPlug")
    suggestionChannel = bot.guildSettings.get(`${req.params.guildID}`, "suggestionPlug.channel");

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
        suggestionEnabled: suggestionEnabled,
        suggestionChannel: suggestionChannel,
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

}).get("/:guildID/tools/autorole", CheckAuth, async(req, res) => {

    let serv = req.bot.guilds.cache.get(req.params.guildID);
    if (!serv) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (!req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect("/");

    let guildSettingsExist = bot.guildSettings.has(`${req.params.guildID}`)

    if (guildSettingsExist === false ) {
        return res.redirect("/serveurs/"+req.params.guildID);
    }

    let autoroleEnabled = bot.guildSettings.has(`${req.params.guildID}`, "autorolePlug")
    let autoroleRole; 

    if (autoroleEnabled) {
        autoroleRole = bot.guildSettings.get(`${req.params.guildID}`, "autorolePlug.role")
    }

    res.render("items/autorole", {
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
        autoroleEnabled: autoroleEnabled,
        autoroleRole: autoroleRole,
        alert: false
    });   
}).post("/:guildID/tools/autorole", CheckAuth, async function(req, res) {

    let guild = req.bot.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (!req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect("/");

    const member = guild.members.cache.get(req.user.id);
    if (!member) return res.redirect("/");
    if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/");

    let data  = req.body;

    //Status :
    let statusAutorole = data.statusAutorole;

    if (statusAutorole != "on") {
        bot.guildSettings.delete(`${req.params.guildID}`, "autorolePlug")
        return res.redirect("/serveurs/"+req.params.guildID+"/tools/autorole");
    }

    // Role : 
    let autoroleRole = guild.roles.cache.find((r) => "@"+r.name === data.roleID).id

    const obj = {
        autorolePlug: {
            role: autoroleRole
        }
    }
    await bot.guildSettings.update(`${req.params.guildID}`, obj)

    autoroleEnabled = bot.guildSettings.get(`${req.params.guildID}`, "autorolePlug")
    autoroleRole = bot.guildSettings.get(`${req.params.guildID}`, "autorolePlug.role")

    res.render("items/autorole", {
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
        autoroleEnabled: autoroleEnabled,
        autoroleRole: autoroleRole,
        alert: true
    });

}).get("/:guildID/tools/auto-mod", CheckAuth, async(req, res) => {

    let serv = req.bot.guilds.cache.get(req.params.guildID);
    if (!serv) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (!req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect("/");

    let guildSettingsExist = bot.guildSettings.has(`${req.params.guildID}`)

    if (guildSettingsExist === false ) {
        return res.redirect("/serveurs/"+req.params.guildID);
    }

    let automodEnabled = bot.guildSettings.has(`${req.params.guildID}`, "automodPlug")

    let antiraid = false;
    let antipub = false;
    let antilink = false;
    let antibadworlds = false;

    if (automodEnabled) {
        antiraid = bot.guildSettings.get(`${req.params.guildID}`, "automodPlug.antiraid")
        antipub = bot.guildSettings.get(`${req.params.guildID}`, "automodPlug.antipub")
        antilink = bot.guildSettings.get(`${req.params.guildID}`, "automodPlug.antilink")
        antibadworlds = bot.guildSettings.get(`${req.params.guildID}`, "automodPlug.antibadworlds")
    }

    res.render("items/auto-mod", {
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
        antiraid: antiraid,
        antipub: antipub,
        antilink: antilink,
        antibadworlds: antibadworlds,
        alert: false
    });   
}).post("/:guildID/tools/auto-mod", CheckAuth, async function(req, res) {

    let guild = req.bot.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (!req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect("/");

    const member = guild.members.cache.get(req.user.id);
    if (!member) return res.redirect("/");
    if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/");

    let data  = req.body;

    let statusAntiraid = data.statusAntiRaid;
    let statusAntipub = data.statusAntiPub;
    let statusAntilink = data.statusAntiLink;
    let statusAntibadworlds = data.statusAntiBadWorlds;

    if (statusAntiraid != "on") statusAntiraid = false
    else statusAntiraid = true

    if (statusAntipub != "on") statusAntipub = false
    else statusAntipub = true

    if (statusAntilink != "on") statusAntilink = false
    else statusAntilink = true

    if (statusAntibadworlds != "on") statusAntibadworlds = false
    else statusAntibadworlds = true

    const obj = {
        automodPlug: {
            antiraid: statusAntiraid,
            antipub: statusAntipub,
            antilink: statusAntilink,
            antibadworlds: statusAntibadworlds
        }
    }
    await bot.guildSettings.update(`${req.params.guildID}`, obj)

    let antiraid = bot.guildSettings.get(`${req.params.guildID}`, "automodPlug.antiraid");
    let antipub = bot.guildSettings.get(`${req.params.guildID}`, "automodPlug.antipub");
    let antilink = bot.guildSettings.get(`${req.params.guildID}`, "automodPlug.antilink");
    let antibadworlds = bot.guildSettings.get(`${req.params.guildID}`, "automodPlug.antibadworlds");


    res.render("items/auto-mod", {
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
        antiraid: antiraid,
        antipub: antipub,
        antilink: antilink,
        antibadworlds: antibadworlds,
        alert: true
    });

})



module.exports = router;