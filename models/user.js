const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("../configs/config.json");

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: { type: String, default: null },
    points: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', UserSchema);