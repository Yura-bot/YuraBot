const express = require('express');
const router = express.Router();
const CheckAuth = require('../auth/CheckAuth');
const Discord = require("discord.js");

let bot = require("../../main.js")
let config = require("../../configs/config.json")

router.get("/:guildID", CheckAuth, async(req, res) => {

    //req.params.guildID
    //req.user.id

    const guild = req.bot.guilds.cache.get(req.params.guildID)

    if (req.user.id != config.owner) {
        if (!req.user.guilds.find((g) => g.id === req.params.guildID)) return res.json("404");
        let userPerm = req.user.guilds.find((g) => g.id === req.params.guildID)
   
        let bits = new Discord.Permissions(userPerm.permissions_new);
        let perms = bits.toArray();
   
        if (!perms.includes("ADMINISTRATOR") || !perms.includes("MANAGE_GUILD")) return res.json("404");
    }

    const guildChannels = {}
    const guildRoles = {}

    await guild.channels.cache.each(r => {
        if(r.type != "GUILD_TEXT") return
        Object.assign(guildChannels, { [r.id]: r.name });
    })

    await guild.roles.cache.each(r => {
        Object.assign(guildRoles, { [r.id]: r.name });
    })

    let db = await bot.db.getGuild(req.params.guildID)

    let prefix = !db.prefix ? config.prefix : db.prefix;
    let guildLanguage = !db.lang ? "english": db.lang;

    let suggestionEnabled = db.suggestions? true : false
    let suggestionChannel = db.suggestions

    if (suggestionEnabled && suggestionEnabled != null) {
        suggestionChannel = db.suggestions
    } else {
        suggestionChannel = null
    }

    if (guildLanguage === "english") {  guildLanguage = "en" } else {  guildLanguage = "fr" }

    let muteRole = db.muteRole

    res.json({
        channels: guildChannels,
        roles: guildRoles,
        prefix: prefix,
        guildLanguage: guildLanguage,
        suggestionEnabled: suggestionEnabled,
        suggestionChannel: suggestionChannel,
        muteRole: muteRole
    });
}).post("/:guildID", CheckAuth, async function(req, res) {

    const guild = req.bot.guilds.cache.get(req.params.guildID)

    if (req.user.id != config.owner) {
        if (!req.user.guilds.find((g) => g.id === req.params.guildID)) return res.json("404");
        let userPerm = req.user.guilds.find((g) => g.id === req.params.guildID)
   
        let bits = new Discord.Permissions(userPerm.permissions_new);
        let perms = bits.toArray();
   
        if (!perms.includes("ADMINISTRATOR") || !perms.includes("MANAGE_GUILD")) return res.json("404");
    }

    let db = await bot.db.getGuild(req.params.guildID)

    let data  = req.body;

    //Prefix :
    if(data.prefix.length > 3) {
        return;
    }
    db.prefix = data.prefix;

    // Lang : 
    let language = data.guildLanguage.toLowerCase();

    if (language === "en") {
        language = "english"
    } else if (language === "fr") {
        language = "french"
    } else {
        return;
    }
    db.lang = language;
    
    //Suggestion System :
    if (data.suggestionEnabled) {
        db.suggestions = data.suggestionChannel
    } else {
        db.suggestions = null;
    }

    if (data.muteRole != "null") db.muteRole = data.muteRole
    else db.muteRole = null

    await db.save();

}).get("/:guildID/tools/welcome", CheckAuth, async(req, res) => {

    const guild = req.bot.guilds.cache.get(req.params.guildID)

    if (req.user.id != config.owner) {
        if (!req.user.guilds.find((g) => g.id === req.params.guildID)) return res.json("404");
        let userPerm = req.user.guilds.find((g) => g.id === req.params.guildID)
   
        let bits = new Discord.Permissions(userPerm.permissions_new);
        let perms = bits.toArray();
   
        if (!perms.includes("ADMINISTRATOR") || !perms.includes("MANAGE_GUILD")) return res.json("404");
    }

    const guildChannels = {}

    await guild.channels.cache.each(r => {
        if(r.type != "GUILD_TEXT") return
        Object.assign(guildChannels, { [r.id]: r.name });
    })

    let db = await bot.db.getGuild(guild.id)

    let welcomeEnabled = db.welcome.enabled
    let welcomeMpEnabled = db.welcomeMp

    let welcomeEmbedEnabled = db.welcome.withEmbed

    let welcomeChannel = db.welcome.channel
    let welcomeMessage = db.welcome.message

    let welcomeImage = db.welcome.withImage
    let imageURL = db.welcome.config.img
    let colorImage = db.welcome.config.colorBackground
    let colorImageTitle = db.welcome.config.colorTitle
    let welcomeMpMessage = null

    if (welcomeMpEnabled != null) {
        welcomeMpEnabled = true
        welcomeMpMessage = db.welcomeMp
    } else {
        welcomeMpEnabled = false
    }

    res.json({
        guildChannels: guildChannels,
        welcomeChannel: welcomeChannel,
        welcomeMessage: welcomeMessage,
        welcomeEnabled: welcomeEnabled,
        welcomeEmbedEnabled: welcomeEmbedEnabled,
        welcomeImage: welcomeImage,
        imageURL: imageURL,
        colorImage: colorImage,
        colorImageTitle: colorImageTitle,
        welcomeMpEnabled: welcomeMpEnabled,
        welcomeMpMessage: welcomeMpMessage
    });
}).post("/:guildID/tools/welcome", CheckAuth, async function(req, res) {

    const guild = req.bot.guilds.cache.get(req.params.guildID)

    if (req.user.id != config.owner) {
        if (!req.user.guilds.find((g) => g.id === req.params.guildID)) return res.json("404");
        let userPerm = req.user.guilds.find((g) => g.id === req.params.guildID)
   
        let bits = new Discord.Permissions(userPerm.permissions_new);
        let perms = bits.toArray();
   
        if (!perms.includes("ADMINISTRATOR") || !perms.includes("MANAGE_GUILD")) return res.json("404");
    }

    let db = await bot.db.getGuild(req.params.guildID)

    let data  = req.body;

    if(data.welcomeEnabled) {
        const obj = {
            enabled: true,
            message: data.welcomeMessage,
            channel: data.welcomeChannel,
            withEmbed: data.welcomeEnabled,
            withImage: data.welcomeImage,
            config: {
                colorTitle: data.colorImageTitle,
                colorBackground: data.colorImage,
                img: data.imageURL,
            }
        }
        db.welcome = obj
    }
    
    if(!data.welcomeEnabled) {
        db.welcome.enabled = false
    }

    if(data.welcomeMpEnabled) {
        db.welcomeMp = data.welcomeMpMessage
    }

    if(!data.welcomeMpEnabled) {
        db.welcomeMp = null
    }

    db.markModified("welcome");
    await db.save();

    res.redirect(`/serveurs/${req.params.guildID}/tools/welcome`);

}).get("/:guildID/tools/goodbye", CheckAuth, async(req, res) => {

    const guild = req.bot.guilds.cache.get(req.params.guildID)

    if (req.user.id != config.owner) {
        if (!req.user.guilds.find((g) => g.id === req.params.guildID)) return res.json("404");
        let userPerm = req.user.guilds.find((g) => g.id === req.params.guildID)
   
        let bits = new Discord.Permissions(userPerm.permissions_new);
        let perms = bits.toArray();
   
        if (!perms.includes("ADMINISTRATOR") || !perms.includes("MANAGE_GUILD")) return res.json("404");
    }

    const guildChannels = {}

    await guild.channels.cache.each(r => {
        if(r.type != "GUILD_TEXT") return
        Object.assign(guildChannels, { [r.id]: r.name });
    })

    let db = await bot.db.getGuild(req.params.guildID)

    let goodbyeEnabled = db.goodbye.enabled
    let goodbyeChannel = db.goodbye.channel
    let goodbyeMessage = db.goodbye.message

    let goodbyeEmbedEnabled = db.goodbye.withEmbed

    let goodbyeImage = db.goodbye.withImage
    let imageURL = db.goodbye.config.img
    let colorImage = db.goodbye.config.colorBackground
    let colorImageTitle = db.goodbye.config.colorTitle
    let goodbyeMpMessage = null

    res.json({
        guildChannels: guildChannels,
        goodbyeChannel: goodbyeChannel,
        goodbyeMessage: goodbyeMessage,
        goodbyeEnabled: goodbyeEnabled,
        goodbyeEmbedEnabled: goodbyeEmbedEnabled,
        goodbyeImage: goodbyeImage,
        imageURL: imageURL,
        colorImage: colorImage,
        colorImageTitle: colorImageTitle
    });   
}).post("/:guildID/tools/goodbye", CheckAuth, async function(req, res) {

    const guild = req.bot.guilds.cache.get(req.params.guildID)

    if (req.user.id != config.owner) {
        if (!req.user.guilds.find((g) => g.id === req.params.guildID)) return res.json("404");
        let userPerm = req.user.guilds.find((g) => g.id === req.params.guildID)
   
        let bits = new Discord.Permissions(userPerm.permissions_new);
        let perms = bits.toArray();
   
        if (!perms.includes("ADMINISTRATOR") || !perms.includes("MANAGE_GUILD")) return res.json("404");
    }

    let db = await bot.db.getGuild(req.params.guildID)

    let data  = req.body;
    console.log(data)

    if (data.goodbyeEnabled) {
        const obj = {
            enabled: true,
            channel: data.goodbyeChannel,
            message: data.goodbyeMessage,
            withEmbed: data.goodbyeEmbedEnabled,
            withImage: data.goodbyeImage,
            config : {
                colorTitle : data.colorImageTitle,
                colorBackground : data.colorImage,
                img : data.imageURL
            }
        }

        db.goodbye = obj
    }
    
    db.markModified("goodbye");
    await db.save();

    res.redirect(`/serveurs/${req.params.guildID}/tools/goodbye`);

}).get("/:guildID/tools/autorole", CheckAuth, async(req, res) => {

    const guild = req.bot.guilds.cache.get(req.params.guildID)

    if (req.user.id != config.owner) {
        if (!req.user.guilds.find((g) => g.id === req.params.guildID)) return res.json("404");
        let userPerm = req.user.guilds.find((g) => g.id === req.params.guildID)
   
        let bits = new Discord.Permissions(userPerm.permissions_new);
        let perms = bits.toArray();
   
        if (!perms.includes("ADMINISTRATOR") || !perms.includes("MANAGE_GUILD")) return res.json("404");
    }

    let db = await bot.db.getGuild(req.params.guildID)

    let autoroleEnabled = db.autorole.enabled
    let autoroleRole = db.autorole.role

    const guildRoles = {}

    await guild.roles.cache.each(r => {
        Object.assign(guildRoles, { [r.id]: r.name });
    })

    let arrayRoles = [];

    if (typeof autoroleRole === 'string') {
        arrayRoles.push(autoroleRole)
    } else if (autoroleRole) {
        await autoroleRole.forEach(async el => {
            arrayRoles.push(el)
        })
    }

    res.json({
        autoroleEnabled: autoroleEnabled,
        autoroleRole: arrayRoles,
        guildRoles: guildRoles
    });   
}).post("/:guildID/tools/autorole", CheckAuth, async function(req, res) {

    const guild = req.bot.guilds.cache.get(req.params.guildID)

    if (req.user.id != config.owner) {
        if (!req.user.guilds.find((g) => g.id === req.params.guildID)) return res.json("404");
        let userPerm = req.user.guilds.find((g) => g.id === req.params.guildID)
   
        let bits = new Discord.Permissions(userPerm.permissions_new);
        let perms = bits.toArray();
   
        if (!perms.includes("ADMINISTRATOR") || !perms.includes("MANAGE_GUILD")) return res.json("404");
    }

    let db = await bot.db.getGuild(req.params.guildID)

    let data  = req.body;

    if(data[0] && data.length <= 6) {
        const obj = {
            enabled: true,
            role: data
        }
    
        db.autorole = obj
    } else {    
        db.autorole.enabled = false
    }
    
    db.markModified("autorole");
    await db.save();

    res.redirect(`/serveurs/${req.params.guildID}/tools/autorole`);

}).get("/:guildID/tools/auto-mod", CheckAuth, async(req, res) => {

    const guild = req.bot.guilds.cache.get(req.params.guildID)

    if (req.user.id != config.owner) {
        if (!req.user.guilds.find((g) => g.id === req.params.guildID)) return res.json("404");
        let userPerm = req.user.guilds.find((g) => g.id === req.params.guildID)
   
        let bits = new Discord.Permissions(userPerm.permissions_new);
        let perms = bits.toArray();
   
        if (!perms.includes("ADMINISTRATOR") || !perms.includes("MANAGE_GUILD")) return res.json("404");
    }

    let db = await bot.db.getGuild(req.params.guildID)

    const guildChannels = {}
    const guildRoles = {}

    await guild.channels.cache.each(r => {
        if(r.type != "GUILD_TEXT") return
        Object.assign(guildChannels, { [r.id]: r.name });
    })

    await guild.roles.cache.each(r => {
        Object.assign(guildRoles, { [r.id]: r.name });
    })

    let antiraid = db.automod.antiRaid
    let antipub = db.automod.antiPub
    let antilink = db.automod.antiLink
    let antibadworlds = db.automod.antiBadWords

    let ignoredChannels = null
    let ignoredRoles = null

    if (db.automod.ignored) {
        ignoredChannels = db.automod.ignored.channels
        ignoredRoles = db.automod.ignored.roles
    }

    res.json({
        channels: guildChannels,
        roles: guildRoles,
        antiraid: antiraid,
        antipub: antipub,
        antilink: antilink,
        antibadworlds: antibadworlds,
        ignoredChannels: ignoredChannels,
        ignoredRoles: ignoredRoles
    });   
}).post("/:guildID/tools/auto-mod", CheckAuth, async function(req, res) {

    const guild = req.bot.guilds.cache.get(req.params.guildID)

    if (req.user.id != config.owner) {
        if (!req.user.guilds.find((g) => g.id === req.params.guildID)) return res.json("404");
        let userPerm = req.user.guilds.find((g) => g.id === req.params.guildID)
   
        let bits = new Discord.Permissions(userPerm.permissions_new);
        let perms = bits.toArray();
   
        if (!perms.includes("ADMINISTRATOR") || !perms.includes("MANAGE_GUILD")) return res.json("404");
    }
    
    let db = await bot.db.getGuild(req.params.guildID)

    let data  = req.body;

    const obj = {
        antiRaid: data.antiraid,
        antiPub: data.antipub,
        antiLink: data.antilink,
        antiBadWords: data.antibadworlds,
        ignored: {
            channels: data.ignored_channels,
            roles: data.ignored_roles
        }
    }

    console.log(obj)

    db.automod = obj

    db.markModified("automod");
    await db.save();

    res.redirect(`/serveurs/${req.params.guildID}/tools/auto-mod`);
})



module.exports = router;