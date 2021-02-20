const express = require('express');
const router = express.Router();
const CheckAuth = require('../auth/CheckAuth');

let bot = require("../../main.js")
let config = require("../../configs/config.json")

router.get("/:guildID/ticket", CheckAuth, async(req, res) => {

    //req.params.guildID
    //req.user.id

    const results = await req.bot.shard.broadcastEval(` let guild = this.guilds.cache.get('${req.params.guildID}'); if(guild) guild.toJSON() `);
    const serv = results.find((g) => g);
    if (!serv || !serv.members) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    const found = serv.members.find(element => element === req.user.id)

    if (req.user.id != config.owner) {
     if (!req.user.guilds.find((g) => g.id === req.params.guildID) || !found) return res.render("404");
     let userPerm = req.user.guilds.find((g) => g.id === req.params.guildID).permissions

     let bits = new Discord.Permissions(userPerm);
     let perms = bits.toArray();

     if (!perms.includes("ADMINISTRATOR") || !perms.includes("MANAGE_GUILD")) return res.render("404");
    }

    const guild = await req.bot.fetchGuild(serv.id);

    let db = await bot.db.getGuild(req.params.guildID)
    
    let isTicket = db.tickets.enabled

    let channel = db.tickets.channel
    let category = db.tickets.category
    let role = db.tickets.role

    res.render("extensions/ticket", {
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
        isTicket: isTicket,
        channel: channel,
        category: category,
        role: role,
        alert: false
    });
}).post("/:guildID/ticket", CheckAuth, async function(req, res) {

    const results = await req.bot.shard.broadcastEval(` let guild = this.guilds.cache.get('${req.params.guildID}'); if(guild) guild.toJSON() `);
    const serv = results.find((g) => g);
    if (!serv || !serv.members) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    const found = serv.members.find(element => element === req.user.id)

    if (req.user.id != config.owner) {
     if (!req.user.guilds.find((g) => g.id === req.params.guildID) || !found) return res.render("404");
     let userPerm = req.user.guilds.find((g) => g.id === req.params.guildID).permissions

     let bits = new Discord.Permissions(userPerm);
     let perms = bits.toArray();

     if (!perms.includes("ADMINISTRATOR") || !perms.includes("MANAGE_GUILD")) return res.render("404");
    }

    const guild = await req.bot.fetchGuild(serv.id);

    let db = await bot.db.getGuild(req.params.guildID)

    let guildLanguage = db.lang
    const language = require(`../../languages/${guildLanguage}`);

    let data  = req.body;

    if(Object.prototype.hasOwnProperty.call(data, "enable") || Object.prototype.hasOwnProperty.call(data, "update")) {

        let Tchannel = guild.channels.find((ch) => "#"+ch.name === data.channel)

        const Discord = require("discord.js");

        let embed = new Discord.MessageEmbed()
        .setTitle(language("TICKET_TITLE"))
        .setColor("#36393f")
        .setDescription(language("TICKET_DESC"));

        let channelSend = await req.bot.shard.broadcastEval(` this.channels.cache.get('${Tchannel.id}') `)
        //console.log(channelSend)

        const results = await req.bot.shard.broadcastEval(`
        const Discord = require("discord.js");

        let embed = new Discord.MessageEmbed()
        .setTitle("${language("TICKET_TITLE")}")
        .setColor("#36393f")
        .setDescription("${language("TICKET_DESC")}");

        let Channel = this.channels.cache.get('${Tchannel.id}')
        if(Channel){ 
            sM(Channel)
        }
        /*
        else { member.send(language("TICKET_ERROR")).catch(e => {}) } 
        */

        async function sM(Channel) {
            let m = await Channel.send(embed)
            m.react('🎟');
        }
        `);

        let obj = {
            enabled: true,
            category: guild.channels.find((ch) => "#"+ch.name === data.category).id,
            channel: Tchannel.id,
            role: guild.roles.find((r) => "@"+r.name === data.role).id,
        };

        db.tickets = obj
        db.markModified("tickets");
        await db.save();
    }
    
    if(Object.prototype.hasOwnProperty.call(data, "disable")) {
        db.tickets.enabled = false
        db.markModified("tickets");
        await db.save();
	}

    res.redirect(`/extensions/${req.params.guildID}/ticket`);
})

module.exports = router;