const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("../configs/config.json");

const GiveawaySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    messageID: String,
    channelID: String,
    guildID: String,
    startAt: Number,
    endAt: Number,
    ended: Boolean,
    winnerCount: String,
    winners: Array,
    prize: String,
    messages: Object,
    hostedBy: String,
    embedColor: String,
    embedColorEnd: String,
    botsCanWin: String,
    exemptPermissions: String,
    exemptMembers: String,
    reaction: String,
    requirements: String,
    winnerIDs: Array,
    extraData: String,
});

module.exports = mongoose.model('Giveaway', GiveawaySchema);
