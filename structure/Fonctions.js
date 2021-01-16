module.exports = client => {
    client.getEmoji = (emojiId) => {
        return client.emojis.cache.get(emojiId).toString();
    }
};