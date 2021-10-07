const { GiveawaysManager } = require('discord-giveaways');
const { Giveaway } = require("../models/index")

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
        return await Giveaway.find().lean().exec();
    }

    async saveGiveaway(messageId, giveawayData) {
        await Giveaway.create(giveawayData);
        return true;
    }

    async editGiveaway(messageId, giveawayData) {
        await Giveaway.updateOne({ messageId }, giveawayData, { omitUndefined: true }).exec();
        return true;
    }

    async deleteGiveaway(messageId) {
        await Giveaway.deleteOne({ messageId }).exec();
        return true;
    }
}