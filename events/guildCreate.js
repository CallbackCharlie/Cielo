const db = require('../managers/database.js');

module.exports = {
    event: 'guildCreate',
    enabled: true,
    run: async (client, guild) => {
        await db.insertGuild(guild.id);
    }
}