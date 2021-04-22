const express = require('express');
const router = express.Router();
const CheckAuth = require('../auth/CheckAuth');
const Discord = require("discord.js");

let bot = require("../../main.js")
let config = require("../../configs/config.json")

router.get("/:guildID", CheckAuth, async(req, res) => {

    //req.params.guildID
    //req.user.id

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
        guild: guildInfos,
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
    let suggestionChannel = guild.channels.find((ch) => "#"+ch.name === data.suggestionChannelID).id;

    if (suggestionEnabled) {
        db.suggestions = suggestionChannel
    } else {
        db.suggestions = null;
    }

    if (data.muteRole != "Desactivate") db.muteRole = guild.roles.find((r) => "@"+r.name === data.muteRole).id

    await db.save();

    res.redirect(`/serveurs/${req.params.guildID}`);

}).get("/:guildID/tools/welcome", CheckAuth, async(req, res) => {

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

    let db = await bot.db.getGuild(serv.id)

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

    res.render("items/welcome", {
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
        welcomeChannel: welcomeChannel,
        welcomeMessage: welcomeMessage,
        welcomeEnabled: welcomeEnabled,
        welcomeEmbedEnabled: welcomeEmbedEnabled,
        welcomeImage: welcomeImage,
        imageURL: imageURL,
        colorImage: colorImage,
        colorImageTitle: colorImageTitle,
        welcomeMpEnabled: welcomeMpEnabled,
        welcomeMpMessage: welcomeMpMessage,
        alert: false
    });
}).post("/:guildID/tools/welcome", CheckAuth, async function(req, res) {

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
        db.welcome.enabled = true
        // Channel : 
        db.welcome.channel = guild.channels.find((ch) => "#"+ch.name === data.channelID).id;
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
                if (data.imageURL) {
                    db.welcome.config.img = data.imageURL
                } else db.welcome.config.img = null
            } else db.welcome.withImage = false
        } else db.welcome.withEmbed = false
    }
    
    if(Object.prototype.hasOwnProperty.call(data, "disable")) {
        db.welcome.enabled = false
    }

    if(Object.prototype.hasOwnProperty.call(data, "enableMp") || Object.prototype.hasOwnProperty.call(data, "updateMp")) {
        db.welcomeMp = data.welcomeMpMessage
    }

    if(Object.prototype.hasOwnProperty.call(data, "disableMp")) {
        db.welcomeMp = null
    }

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

    let autoroleEnabled = db.autorole.enabled
    let autoroleRole = db.autorole.role

    res.render("items/autorole", {
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
        autoroleEnabled: autoroleEnabled,
        autoroleRole: autoroleRole,
        alert: false
    });   
}).post("/:guildID/tools/autorole", CheckAuth, async function(req, res) {

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
        const obj = {
            enabled: true,
            role: guild.roles.find((r) => "@"+r.name === data.roleID).id
        }
    
        db.autorole = obj
    }

    if(Object.prototype.hasOwnProperty.call(data, "disable")) {    
        db.autorole.enabled = false
    }
    
    db.markModified("autorole");
    await db.save();

    res.redirect(`/serveurs/${req.params.guildID}/tools/autorole`);

}).get("/:guildID/tools/auto-mod", CheckAuth, async(req, res) => {

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

    res.render("items/auto-mod", {
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
        antiraid: antiraid,
        antipub: antipub,
        antilink: antilink,
        antibadworlds: antibadworlds,
        ignoredChannels: ignoredChannels,
        ignoredRoles: ignoredRoles,
        alert: false
    });   
}).post("/:guildID/tools/auto-mod", CheckAuth, async function(req, res) {

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

    if(Object.prototype.hasOwnProperty.call(data, "config")) {
        if (data.channelsIgnored || data.rolesIgnored) {
            let channels = data.channelsIgnored
            let roles = data.rolesIgnored
    
            if (Array.isArray(channels)) {
    
                channelsCopie = [];
                channels.forEach(element => channelsCopie.push(guild.channels.find((ch) => "#"+ch.name === element).id));
                channels = channelsCopie
    
            } else {
                if (channels) channels = guild.channels.find((ch) => "#"+ch.name === channels).id.split();
                else channels = null
            }

            if (Array.isArray(roles)) {
    
                rolesCopie = [];
                roles.forEach(element => rolesCopie.push(guild.roles.find((r) => "@"+r.name === element).id));
                roles = rolesCopie
    
            } else {
                if (roles) roles = guild.roles.find((r) => "@"+r.name === roles).id.split();
                else roles = null
            }
    
            db.automod.ignored = { channels: channels, roles: roles }
        } else {
            db.automod.ignored = { channels: null, roles: null }
        }

        db.markModified("automod");
        await db.save();
    }

    if(Object.prototype.hasOwnProperty.call(data, "basic")) {
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

        db.automod.antiRaid = statusAntiraid
        db.automod.antiPub = statusAntipub
        db.automod.antiLink = statusAntilink
        db.automod.antiBadWords = statusAntibadworlds
        
        db.markModified("automod");
        await db.save();
    }

    res.redirect(`/serveurs/${req.params.guildID}/tools/auto-mod`);
})



module.exports = router;