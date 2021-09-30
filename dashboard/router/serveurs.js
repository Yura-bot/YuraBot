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
    console.log(data)

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

    console.log(db.welcome)

    db.markModified("welcome");
    await db.save();

    res.redirect(`/serveurs/${req.params.guildID}/tools/welcome`);

}).get("/:guildID/tools/goodbye", CheckAuth, async(req, res) => {

    const results = await req.bot.shard.broadcastEval(` let guild = this.guilds.cache.get('${req.params.guildID}'); if(guild) guild.toJSON() `);
    const serv = results.find((g) => g);
    if (!serv || !serv.members) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);

    if (req.user.id != config.owner) {
     if (!req.user.guilds.find((g) => g.id === req.params.guildID)) return res.render("404");
     let userPerm = req.user.guilds.find((g) => g.id === req.params.guildID).permissions
     

     let bits = new Discord.Permissions(userPerm);
     let perms = bits.toArray();

     if (!perms.includes("ADMINISTRATOR") || !perms.includes("MANAGE_GUILD")) return res.render("404");
    }
    const guildInfos = await req.bot.fetchGuild(serv.id);

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

    res.render("items/goodbye", {
        name: (req.isAuthenticated() ? `${req.user.username}` : `Profil`),
        avatar: (req.isAuthenticated() ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : `https://image.noelshack.com/fichiers/2020/36/1/1598862029-disc.png`),
        status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "Se connecter"),
        botclient: req.client.user,
        bot: bot,
        user: req.user,
        login: "oui",
        guild: guildInfos,
        avatarURL: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
        iconURL: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`,
        message: "",
        messageType: "success",
        goodbyeChannel: goodbyeChannel,
        goodbyeMessage: goodbyeMessage,
        goodbyeEnabled: goodbyeEnabled,
        goodbyeImage: goodbyeImage,
        goodbyeEmbedEnabled: goodbyeEmbedEnabled,
        goodbyeImage: goodbyeImage,
        imageURL: imageURL,
        colorImage: colorImage,
        colorImageTitle: colorImageTitle,
        alert: false
    });   
}).post("/:guildID/tools/goodbye", CheckAuth, async function(req, res) {

    const results = await req.bot.shard.broadcastEval(` let guild = this.guilds.cache.get('${req.params.guildID}'); if(guild) guild.toJSON() `);
    const serv = results.find((g) => g);
    if (!serv || !serv.members) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);

    if (req.user.id != config.owner) {
     if (!req.user.guilds.find((g) => g.id === req.params.guildID)) return res.render("404");
     let userPerm = req.user.guilds.find((g) => g.id === req.params.guildID).permissions
     

     let bits = new Discord.Permissions(userPerm);
     let perms = bits.toArray();

     if (!perms.includes("ADMINISTRATOR") || !perms.includes("MANAGE_GUILD")) return res.render("404");
    }
    const guild = await req.bot.fetchGuild(serv.id);

    let db = await bot.db.getGuild(req.params.guildID)

    let data  = req.body;

    if(Object.prototype.hasOwnProperty.call(data, "enable") || Object.prototype.hasOwnProperty.call(data, "update")) {
        db.goodbye.enabled = true
        // Channel : 
        db.goodbye.channel = guild.channels.find((ch) => "#"+ch.name === data.channelID).id;
        //Message
        db.goodbye.message = data.goodbyeMessage;
        //Embed ?
        let goodbyeEmbedConfig = data.withEmbed === "on"
        //Image ?
        let goodbyeImageConfig = data.withImage === "on"
        
        if (goodbyeEmbedConfig) {
            db.goodbye.withEmbed = true
            if (goodbyeImageConfig) {
                db.goodbye.withImage = true
                db.goodbye.config.colorTitle = data.imgColorTitle
                db.goodbye.config.colorBackground = data.imgColor
                if (data.imageURL) {
                    db.goodbye.config.img = data.imageURL
                } else db.goodbye.config.img = null
            } else db.goodbye.withImage = false
        } else db.goodbye.withEmbed = false
    }

    if(Object.prototype.hasOwnProperty.call(data, "disable")) {
        db.goodbye.enabled = false
    }

    /*
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
    */
    
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