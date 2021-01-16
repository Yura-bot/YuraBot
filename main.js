const { Client, Collection, MessageEmbed  } = require('discord.js');

const Config = require('./configs/config.json');
const Snippet = require('./configs/Snippet');
const Handler = require('./structure/Handler');

const webhook = require('discord-webhook-node');
const { GiveawaysManager } = require('discord-giveaways');

const ameClient = require("amethyste-api")
const { Client: Joke } = require("blague.xyz");
const DBL = require("dblapi.js");

const { Player } = require("discord-player");
const AntiSpam = require('discord-anti-spam');

class Class extends Client {
    constructor() {
        super({ 
            disableMentions: "everyone" , 
            ws : { intents: [ "GUILDS", "GUILD_MEMBERS", "GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_PRESENCES" ] },
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
            leaveOnEnd: true
        });

        this.db = require("./structure/Mongoose.js");

        this.giveawaysManager = new GiveawaysManager(this, {
            hasGuildMembersIntent: true,
            storage: "./giveaways.json",
            updateCountdownEvery: 5000,
            default: {
                botsCanWin: false,
                exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],
                embedColor: "#0049FF",
                reaction: "🎉"
            }
        });

        this.ameApi = new ameClient(Config.ameToken)
        this.joke = new Joke(Config.jokeToken, { defaultLang: "fr" });

        this.dbl = new DBL(Config.dblApi, this);

        this.dash = require("./dashboard/dashboard.js");

        this.antiSpam = new AntiSpam({
            warnThreshold: 2,
            kickThreshold: 4,
            banThreshold: 6,
            maxInterval: 2000,
            warnMessage: true,
            kickMessage: true,
            banMessage: true,
            maxDuplicatesWarning: 7,
            maxDuplicatesKick: 10,
            maxDuplicatesBan: 12,
            exemptPermissions: [ 'ADMINISTRATOR', "MANAGE_GUILD"],
            ignoreBots: false,
            verbose: false,
            ignoredUsers: [],
        });

        require("./structure/Fonctions")(this);

        process.on('unhandledRejection', error => {
            this.emit('error', error, "bot");
        })

        this.on("disconnect", () => this.hook.info("Bot is disconnecting...", "warn"))
        .on("reconnecting", () => this.logger.info("Bot reconnecting...", "log"))
        .on("error", (e, cmd) => this.hook.error('**Bot error**', `Quelque chose s'est mal passé, commande : **${cmd}**`, `${e}`).catch(e => {}))
        .on("warn", (info) => this.hook.warn('**Bot Warn**', `Quelque chose s'est mal passé.`, `${info}`).catch(e => {}));

        try { this.launch().then(() => { console.log("• Lancement du robot réussi, connexion à Discord.."); }); }
        catch (e) { throw new Error(e); }

        this.login(Config.token).then(() => { console.log("• Connexion à Discord réussi !"); });
    }

    async launch() {
        this.config = Config;
        this.snippet = Snippet;

        this.commands = new Collection();

        const handlers = new Handler(this);
        handlers.commands(); handlers.events(); handlers.musicEvents();
    }
}

module.exports = new Class();

