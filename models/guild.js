const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("../configs/config.json");

const GuildSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: String,
    prefix: { type: String, default: config.prefix },
    lang: { type: String, default: "english" },
    plugins: { type: Object, default: {}},
    welcome: { type: Object, default: {
        enabled: false,
        message: null,
        channel: null,
        withEmbed: null,
        withImage: null,
        config: {
            colorTitle: "#563d7c",
            colorBackground: "#563d7c",
            img: null,
        }
    }},
    welcomeMp: { type: String, default: null },
    goodbye: { type: Object, default: {
        enabled: false,
        message: null,
        channel: null,
        withEmbed: null,
        withImage: null,
        config: {
            colorTitle: "#563d7c",
            colorBackground: "#563d7c",
            img: null,
        }
    }},
    autorole: { type: Object, default: {
        enabled: false,
        role: null
    }},
    automod: { type: Object, default: {
        antiRaid: false,
        antiPub: false,
        antiLink: false,
        antiBadWords: false
    }},
    tickets: { type: Object, default: {
        enabled: false,
        category: null,
        channel: null,
        role: null,
    }},
    suggestions: { type: String, default: null },
    muteRole: { type: String, default: null }
});

module.exports = mongoose.model('Guild', GuildSchema);
