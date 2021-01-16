const express = require('express');
const router = express.Router();
const CheckAuth = require('../auth/CheckAuth');

let bot = require("../../main.js")
let config = require("../../configs/config.json")

router.get("/:guildID", CheckAuth, async(req, res) => {

    //req.params.guildID
    //req.user.id

    let serv = req.bot.guilds.cache.get(req.params.guildID);
    if (!serv) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD") === false) return res.redirect("/");

    let db = await bot.db.getGuild(req.params.guildID)

    let prefix = !db.prefix ? config.prefix : db.prefix;
    let guildLanguage = !db.lang ? "english": db.lang;
    let language2;

    let suggestionEnabled = db.suggestions
    let suggestionChannel = db.suggestions

    if (suggestionEnabled && suggestionEnabled != null) {
        suggestionChannel = db.suggestions
    } else {
        suggestionEnabled = false
        suggestionChannel = false
    }

    if (guildLanguage === "english") { 
        guildLanguage = "Anglais"
        language2 = "Français" 
    } else  { 
        guildLanguage = "Français"
        language2 = "Anglais" 
    }

    let muteRole = db.muteRole

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
        muteRole: muteRole,
        alert: false
    });
}).post("/:guildID", CheckAuth, async function(req, res) {

    let guild = req.bot.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (!req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect("/");

    const member = guild.members.cache.get(req.user.id);
    if (!member) return res.redirect("/");
    if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/");

    let db = await bot.db.getGuild(req.params.guildID)

    let data  = req.body;

    //Prefix :
    if(data.prefix.length > 3) {
        return;
    }
    db.prefix = data.prefix;

    // Lang : 
    let language = data.language.toLowerCase();

    if (language === "anglais") {
        language = "english"
    } else if (language === "français") {
        language = "french"
    } else {
        return;
    }
    db.lang = language;
    
    //Suggestion System :
    let suggestionEnabled = data.suggestionStatus === "on";
    let suggestionChannel = guild.channels.cache.find((ch) => "#"+ch.name === data.suggestionChannelID).id;

    if (suggestionEnabled) {
        db.suggestions = suggestionChannel
    } else {
        db.suggestions = null;
    }

    db.muteRole = guild.roles.cache.find((r) => "@"+r.name === data.muteRole).id

    await db.save();

    res.redirect(`/serveurs/${req.params.guildID}`);

}).get("/:guildID/tools/welcome", CheckAuth, async(req, res) => {

    let serv = req.bot.guilds.cache.get(req.params.guildID);
    if (!serv) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (!req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect("/");

    let db = await bot.db.getGuild(req.params.guildID)

    let welcomeEnabled = db.welcome.enabled
    let welcomeMpEnabled = db.welcomeMp

    let welcomeEmbedEnabled = db.welcome.withEmbed

    let welcomeChannel; 
    let welcomeMessage;

    let welcomeImage = false
    let colorImage = db.welcome.config.colorBackground
    let colorImageTitle = db.welcome.config.colorTitle
    let welcomeMpMessage = null

    if (welcomeEnabled) {
        welcomeChannel = db.welcome.channel
        welcomeMessage = db.welcome.message
        if (welcomeEmbedEnabled) {
            welcomeImage = db.welcome.withImage
        }
    }

    if (welcomeMpEnabled != null) {
        welcomeMpEnabled = true
        welcomeMpMessage = db.welcomeMp
    } else {
        welcomeMpEnabled = false
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
        welcomeEmbedEnabled: welcomeEmbedEnabled,
        welcomeImage: welcomeImage,
        colorImage: colorImage,
        colorImageTitle: colorImageTitle,
        welcomeMpEnabled: welcomeMpEnabled,
        welcomeMpMessage: welcomeMpMessage,
        alert: false
    });
}).post("/:guildID/tools/welcome", CheckAuth, async function(req, res) {

    let guild = req.bot.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (!req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect("/");

    const member = guild.members.cache.get(req.user.id);
    if (!member) return res.redirect("/");
    if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/");

    let db = await bot.db.getGuild(req.params.guildID)

    let data  = req.body;

    //Status :
    let statusWelcome = data.statusWelcome;
    let statusMpWelcome = data.statusMpWelcome;

    if (statusWelcome != "on") {
        db.welcome.enabled = false
        statusWelcome = false 
    }

    if (statusMpWelcome != "on") {
        db.welcomeMp = null
        statusMpWelcome = false 
    }

    if (statusWelcome != false) {
        db.welcome.enabled = true
        // Channel : 
        db.welcome.channel = guild.channels.cache.find((ch) => "#"+ch.name === data.channelID).id;
        //Message
        db.welcome.message = data.welcomeMessage;
        //Embed ?
        let welcomeEmbedConfig = data.withEmbed === "on"
        //Image ?
        let welcomeImageConfig = data.withImage === "on"
        
        if (welcomeEmbedConfig) {
            db.welcome.withEmbed = true
            if (welcomeImageConfig) {
                db.welcome.withImage = true
                db.welcome.config.colorTitle = data.imgColorTitle
                db.welcome.config.colorBackground = data.imgColor
            } else db.welcome.withImage = false
        } else db.welcome.withEmbed = false
    }

    if (statusMpWelcome != false) {
        db.welcomeMp = data.welcomeMpMessage
    }

    db.markModified("welcome");
    await db.save();

    res.redirect(`/serveurs/${req.params.guildID}/tools/welcome`);

}).get("/:guildID/tools/goodbye", CheckAuth, async(req, res) => {

    let serv = req.bot.guilds.cache.get(req.params.guildID);
    if (!serv) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (!req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect("/");

    let db = await bot.db.getGuild(req.params.guildID)

    let goodbyeEnabled = db.goodbye.enabled

    let goodbyeChannel = db.goodbye.channel
    let goodbyeMessage = db.goodbye.message
    let goodbyeImage = db.goodbye.withImage

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

    let db = await bot.db.getGuild(req.params.guildID)

    let data  = req.body;

    //Status :
    let statusGoodbye = data.statusGoodbye;

    if (statusGoodbye != "on") {
        statusGoodbye = false
    } else statusGoodbye = true

    const obj = {
        enabled: statusGoodbye,
        channel: guild.channels.cache.find((ch) => "#"+ch.name === data.channelID).id,
        message: data.goodbyeMessage,
        withEmbed: false,
        withImage: false,
        config : {
            colorTitle : "#563d7c",
            colorBackground : "#563d7c",
            img : null
        }
    }

    db.goodbye = obj
    
    db.markModified("goodbye");
    await db.save();

    res.redirect(`/serveurs/${req.params.guildID}/tools/goodbye`);

}).get("/:guildID/tools/autorole", CheckAuth, async(req, res) => {

    let serv = req.bot.guilds.cache.get(req.params.guildID);
    if (!serv) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (!req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect("/");

    let db = await bot.db.getGuild(req.params.guildID)

    let autoroleEnabled = db.autorole.enabled
    let autoroleRole; 

    if (autoroleEnabled) {
        autoroleRole = db.autorole.role
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

    let db = await bot.db.getGuild(req.params.guildID)

    let data  = req.body;

    //Status :
    let statusAutorole = data.statusAutorole;

    if (statusAutorole != "on") {
        statusAutorole = false
    } else statusAutorole = true

    const obj = {
        enabled: statusAutorole,
        role: guild.roles.cache.find((r) => "@"+r.name === data.roleID).id
    }

    db.autorole = obj
    
    db.markModified("autorole");
    await db.save();

    res.redirect(`/serveurs/${req.params.guildID}/tools/autorole`);

}).get("/:guildID/tools/auto-mod", CheckAuth, async(req, res) => {

    let serv = req.bot.guilds.cache.get(req.params.guildID);
    if (!serv) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if (!req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect("/");

    let db = await bot.db.getGuild(req.params.guildID)

    let antiraid = db.automod.antiRaid
    let antipub = db.automod.antiPub
    let antilink = db.automod.antiLink
    let antibadworlds = db.automod.antiBadWords

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

    let db = await bot.db.getGuild(req.params.guildID)

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
        antiRaid: statusAntiraid,
        antiPub: statusAntipub,
        antiLink: statusAntilink,
        antiBadWords: statusAntibadworlds
    }

    db.automod = obj
    
    db.markModified("automod");
    await db.save();

    res.redirect(`/serveurs/${req.params.guildID}/tools/auto-mod`);
})



module.exports = router;