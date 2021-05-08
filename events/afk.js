const db = require('../managers/database');

module.exports = {
    event: 'message',
    enabled: true,
    run: async (client, message) => {
        if (message.author.bot) return;
        if (message.channel.type === 'dm') return;

        db.fetchAFKStatus(message.guild.id, message.author.id).then(status => {
            if (status !== undefined) {
                db.dropAFK(message.guild.id, message.author.id);
                message.reply('\nYour AFK Status has been removed.');
            }
        });

        const mentioned = message.mentions.members.first();
        if (mentioned || mentioned !== undefined) {
            db.fetchAFKStatus(message.guild.id, mentioned.user.id).then(status => {
                if (status !== undefined) {
                    message.reply(`\n${mentioned} is currently AFK!\n> ${status}`);
                };
            });
        }
    }
}