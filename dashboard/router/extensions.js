const express = require('express');
const router = express.Router();
const CheckAuth = require('../auth/CheckAuth');

let bot = require("../../main.js")
let config = require("../../configs/config.json")

const Discord = require("discord.js");

router.get("/:guildID/ticket", CheckAuth, async(req, res) => {

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
    const guildCategory = {}
    const guildRoles = {}

    await guild.channels.cache.each(r => {
        if(r.type != "GUILD_TEXT") return
        Object.assign(guildChannels, { [r.id]: r.name });
    })

    await guild.channels.cache.each(r => {
        if(r.type != "GUILD_CATEGORY") return
        Object.assign(guildCategory, { [r.id]: r.name });
    })

    await guild.roles.cache.each(r => {
        Object.assign(guildRoles, { [r.id]: r.name });
    })

    let db = await bot.db.getGuild(req.params.guildID)
    
    let isTicket = db.tickets.enabled

    let channel = db.tickets.channel
    let category = db.tickets.category
    let role = db.tickets.role

    res.json({
        guildChannels: guildChannels,
        guildCategory: guildCategory,
        guildRoles: guildRoles,
        isTicket: isTicket,
        channel: channel,
        category: category,
        role: role
    });
}).post("/:guildID/ticket", CheckAuth, async function(req, res) {

    const guild = req.bot.guilds.cache.get(req.params.guildID)

    if (req.user.id != config.owner) {
        if (!req.user.guilds.find((g) => g.id === req.params.guildID)) return res.json("404");
        let userPerm = req.user.guilds.find((g) => g.id === req.params.guildID)
   
        let bits = new Discord.Permissions(userPerm.permissions_new);
        let perms = bits.toArray();
   
        if (!perms.includes("ADMINISTRATOR") || !perms.includes("MANAGE_GUILD")) return res.json("404");
    }

    let db = await bot.db.getGuild(req.params.guildID)
    
    let guildLanguage = db.lang
    const language = require(`../../languages/${guildLanguage}`);

    let data  = req.body;

    if(!data.disabled) {

        const Discord = require("discord.js");

        let embed = new Discord.MessageEmbed()
        .setTitle(language("TICKET_TITLE"))
        .setColor("#36393f")
        .setDescription(language("TICKET_DESC"));

        let Channel = await req.bot.channels.cache.get(data.channel)
        if(Channel){ 
            sM(Channel)
        }
        /*
        else { member.send(language("TICKET_ERROR")).catch(e => {}) } 
        */

        async function sM(Channel) {
            let m = await Channel.send({ embeds: [embed] })
            m.react('🎟');
        }

        let obj = {
            enabled: true,
            category: data.category,
            channel: data.channel,
            role: data.role
        };

        db.tickets = obj
        db.markModified("tickets");
        await db.save();
    } else {
        db.tickets.enabled = false
        db.markModified("tickets");
        await db.save();
	}

    res.redirect(`/extensions/${req.params.guildID}/ticket`);
}).get("/:guildID/reactionroles", CheckAuth, async(req, res) => {

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
    const guild = await req.bot.fetchGuild(serv.id);

    let db = await bot.db.getGuild(req.params.guildID)
    let reactionRolesDB = await bot.db.getReactionRoles(false, serv.id)

    if (reactionRolesDB) {}

    res.render("extensions/reactionroles", {
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
        reactionRolesDB: reactionRolesDB,
        alert: false
    });
})

module.exports = router;
