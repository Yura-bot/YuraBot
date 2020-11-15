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

        this.player
        .on('trackStart', (message, track) => message.channel.send(`Now playing ${track.title}...`))
        .on('trackAdd', (message, track) => message.channel.send(`${track.title} has been added to the queue!`))
        .on('playlistAdd', (message, playlist) => message.channel.send(`${playlist.title} has been added to the queue (${playlist.items.length} songs)!`))
        .on('searchInvalidResponse', (message, query, tracks, content, collector) => message.channel.send(`You must send a valid number between 1 and ${tracks.length}!`))
        .on('searchCancel', (message, query, tracks) => message.channel.send('You did not provide a valid response... Please send the command again!'))
        .on('noResults', (message, query) => message.channel.send(`No results found on YouTube for ${query}!`))
        .on('queueEnd', (message, queue) => message.channel.send('Music stopped as there is no more music in the queue!'))
        .on('channelEmpty', (message, queue) => message.channel.send('Music stopped as there is no more member in the voice channel!'))
        .on('botDisconnect', (message, queue) => message.channel.send('Music stopped as I have been disconnected from the channel!'))
        .on('error', (error, message) => {
            switch(error){
                case 'NotPlaying':
                    message.channel.send('There is no music being played on this server!')
                    break;
                case 'NotConnected':
                    message.channel.send('You are not connected in any voice channel!')
                    break;
                case 'UnableToJoin':
                    message.channel.send('I am not able to join your voice channel, please check my permissions!')
                    break;
                default:
                    message.channel.send(`Something went wrong... Error: ${error}`)
            }
        })

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
        handlers.commands(); handlers.events();
    }

    getEmoji(emojiId) {
        return this.emojis.cache.get(emojiId).toString();
    }

}

module.exports = new Class();

