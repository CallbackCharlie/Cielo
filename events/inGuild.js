const db = require('../managers/database');

module.exports = {
    event: 'message',
    enabled: true,
    run: async (client, message) => {
        if (message.author.bot) return;
        if (message.channel.type === 'dm') return;

        db.fetchGuild(message.guild.id).then(guildID => {
            if (guildID === message.guild.id) return;

            db.insertGuild(message.guild.id);
        });
        
    }
}