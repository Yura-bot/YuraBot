module.exports = client => {
    client.getEmoji = (emojiId) => {
        return client.emojis.cache.get(emojiId).toString();
    }

    client.isURL = (str) => {
        let array = [ ".png", ".jpg" ]
        return array.some(list => str.includes(list))
    }
};