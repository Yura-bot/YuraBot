const { GiveawaysManager } = require('discord-giveaways');

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
        return await this.client.db.giveaway(true, false, false, false, false)
    }

    async saveGiveaway(messageID, giveawayData) {
        this.client.db.giveaway(false, giveawayData, false, false, false)
        return true;
    }

    async editGiveaway(messageID, giveawayData) {
        await this.client.db.giveaway(false, false, false, false, giveawayData)
        return true;
    }

    async deleteGiveaway(messageID) {
        await this.client.db.giveaway(false, false, messageID, false, false)
        return true;
    }
}