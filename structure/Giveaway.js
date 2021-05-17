const { GiveawaysManager } = require('discord-giveaways');

const mongoose = require("mongoose");
const GiveawayModel = require("../models/giveaway.js")

module.exports = class extends GiveawaysManager {
    /*
    constructor(client) {
        this.client = client;
    }
    */

    async refreshStorage() {
        return this.client.shard.broadcastEval(() => this.giveawaysManager.getAllGiveaways());
    }

    async getAllGiveaways() {
        return await GiveawayModel.find({});
    }

    async saveGiveaway(messageID, giveawayData) {

        let NewDB = { _id: mongoose.Types.ObjectId() }
        NewDB = Object.assign(giveawayData, NewDB);
    
        let giveaway = new GiveawayModel(NewDB)
        await giveaway.save();

        return true;
    }

    async editGiveaway(messageID, giveawayData) {
        await GiveawayModel.updateOne({ messageID: messageID }, giveawayData);
        return true;
    }

    async deleteGiveaway(messageID) {
        await GiveawayModel.deleteOne({ messageID: messageID });
        return true;
    }
}