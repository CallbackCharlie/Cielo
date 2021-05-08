const db = require('../managers/database');

module.exports = {
    event: 'message',
    enabled: true,
    run: async (client, message) => {
        if (message.channel.type === 'dm') return;

        db.fetchBlacklistWords(message.guild.id).then(words => {
            if (!words[0]) return;

            const msg = message.content.toLowerCase();
            if (words.some(word => msg.includes(word))) return message.delete();
        });
    }
}