const { Client, Collection, MessageEmbed  } = require('discord.js');

const Config = require('./configs/config.json');
const Snippet = require('./configs/Snippet');
const Handler = require('./structure/Handler');

const Enmap = require("enmap");
const webhook = require('discord-webhook-node');
const { GiveawaysManager } = require('discord-giveaways');
const ameClient = require("amethyste-api")
const { Client: Joke } = require("blague.xyz");
const { Player } = require("discord-player");

class Class extends Client {
    constructor() {
        super({ disableMentions: "everyone" , partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

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

        this.guildSettings = new Enmap({ name: 'guildSettings' });
        this.userData = new Enmap({ name: 'userData' });
        this.warn = new Enmap({ name: 'warn' });

        this.giveawaysManager = new GiveawaysManager(this, {
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

        this.dash = require("./dashboard/dashboard.js");

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

    getEmoji(emojiId) {
        return this.emojis.cache.get(emojiId).toString();
    }

}

module.exports = new Class();

