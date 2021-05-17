const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("../configs/config.json");

const NotifSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: { type: String, default: null },
    data: { type: Array, default: [] }
});

module.exports = mongoose.model('Notif', NotifSchema);