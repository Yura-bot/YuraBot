const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("../configs/config.json");

const ReactionRolesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildId: { type: String, default: null },
    messageId: { type: String, default: null },
    pro: { type: Boolean, default: false },
    data: { type: Object, default: {} }
});

module.exports = mongoose.model('ReactionRoles', ReactionRolesSchema);