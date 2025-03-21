const { Client, Collection  } = require('discord.js');

const Config = require('./configs/config.json');
const Snippet = require('./configs/Snippet');
const Handler = require('./structure/Handler');

const webhook = require('discord-webhook-node');
const ameClient = require("amethyste-api")
const { DiscordTogether } = require('discord-together');
const AntiSpam = require('discord-anti-spam');

const { Player } = require("discord-player");
const { Lyrics } = require("@discord-player/extractor");

const ms = require('ms');

class Class extends Client {
    constructor() {
        super({ 
            disableMentions: "everyone" , 
            intents: [ "GUILDS", "GUILD_MEMBERS", "GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS" ],
            partials: ['MESSAGE', 'CHANNEL', 'REACTION']
        });

        this.hook = new webhook.Webhook(Config.webhook);
        this.default_prefix = Config.prefix;
        this.url = Config.url;
        this.color = Config.color;
        this.footer = Config.footer;

        this.player = new Player(this, {
            leaveOnEmpty: true,
            leaveOnStop: true,
            leaveOnEnd: true,
            leaveOnEmptyCooldown: 60000,
            enableLive: true
        });
        this.lyricsClient = Lyrics.init("");

        this.db = require("./structure/Mongoose.js");

        const YuraGiveaway = require('./structure/Giveaway.js');

        this.giveawaysManager = new YuraGiveaway(this, {
            storage: false,
            endedGiveawaysLifetime: ms("7d"),
            default: {
                botsCanWin: false,
                exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],
                embedColor: "RANDOM",
                reaction: "🎉"
            }
        });

        this.ameApi = new ameClient(Config.ameToken)

        this.discordTogether = new DiscordTogether(this);

        this.dash = require("./dashboard/dashboard.js");
        this.spawned = false;

        this.antiSpam = new AntiSpam({
            muteThreshold: 3,
            banThreshold: 7,
            warnThreshold: 2,
            kickThreshold: 4,
            banThreshold: 6,
            maxInterval: 2000,
            warnMessage: true,
            kickMessage: true,
            muteMessage: true,
            banMessage: true,
            maxDuplicatesWarning: 7,
            maxDuplicatesKick: 10,
            maxDuplicatesMute: 6,
            maxDuplicatesBan: 12,
            exemptPermissions: [ 'ADMINISTRATOR', "MANAGE_GUILD"],
            ignoreBots: false,
            verbose: false,
            ignoredMembers: [],
            muteRoleName: "Muted",
            removeMessages: true,
        });

        require("./structure/Fonctions")(this);

        process
        .on('unhandledRejection', error => {
            //this.emit('error', error, "bot");
            console.error(error);
        })
        .on('warning', (warning) => {
            //this.emit('warn', warning.message, "bot");
            console.warn(warning.stack);
        });
        
        //this.on("disconnect", () => this.hook.info("Bot is disconnecting...", "warn"))
        //.on("reconnecting", () => this.logger.info("Bot reconnecting...", "log"))
        //.on("error", (e, cmd) => this.hook.error('**Bot error**', `Quelque chose s'est mal passé, commande : **${cmd}**`, `${e}`).catch(e => {}))
        //.on("warn", (info) => this.hook.warn('**Bot Warn**', `Quelque chose s'est mal passé.`, `${info}`).catch(e => {}));

        try { this.launch().then(() => { console.log("• Lancement du robot réussi, connexion à Discord.."); }); }
        catch (e) { throw new Error(e); }

        this.login(Config.token).then(() => { console.log("• Connexion à Discord réussi !"); });
    }

    async launch() {
        this.config = Config;
        this.snippet = Snippet;

        this.commands = new Collection();

        const handlers = new Handler(this);
        handlers.commands(); handlers.events(); handlers.musicEvents(); handlers.giveawayEvents();
    }
}

module.exports = new Class();
