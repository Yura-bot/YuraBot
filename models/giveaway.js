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
    botsCanWin: Boolean,
    exemptPermissions: Array,
    exemptMembers: Array,
    reaction: String,
    requirements: Object,
    winnerIDs: Array,
    extraData: Object,
});

module.exports = mongoose.model('Giveaway', GiveawaySchema);
